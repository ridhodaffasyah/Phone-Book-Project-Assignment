import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import createApolloClient from "@/apollo-client";
import {
  Modal,
  ModalContent,
  CloseButton,
  Container,
  Form,
  ContainerInput,
  Label,
  Input,
  ContainerButton,
  Button,
} from "./style";

interface FormModalProps {
  setIsShowModal: (value: boolean) => void;
  updateContactsList: (value: any) => void;
  updateEditedContact: (value: any) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  selectedContact: any;
}

const FormModal: React.FC<FormModalProps> = ({
  setIsShowModal,
  updateContactsList,
  updateEditedContact,
  isEdit,
  setIsEdit,
  selectedContact, // Receive the selected contact data
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([{ number: "" }]);
  const [visible, setVisible] = useState(true);

  const client = createApolloClient();

  const [addContact] = useMutation(gql`
    mutation AddContactWithPhones(
      $first_name: String!
      $last_name: String!
      $phones: [phone_insert_input!]!
    ) {
      insert_contact(
        objects: {
          first_name: $first_name
          last_name: $last_name
          phones: { data: $phones }
        }
      ) {
        returning {
          first_name
          last_name
          id
          phones {
            number
          }
        }
      }
    }
  `);

  const [updateContact] = useMutation(gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
      update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  `);

  const [updatePhoneNumbers] = useMutation(gql`
    mutation EditPhoneNumber(
      $pk_columns: phone_pk_columns_input!
      $new_phone_number: String!
    ) {
      update_phone_by_pk(
        pk_columns: $pk_columns
        _set: { number: $new_phone_number }
      ) {
        contact {
          id
          last_name
          first_name
          created_at
          phones {
            number
          }
        }
      }
    }
  `);

  useEffect(() => {
    // Populate the form fields with the selected contact data when editing
    if (isEdit && selectedContact) {
      setFirstName(selectedContact.first_name);
      setLastName(selectedContact.last_name);
      setPhoneNumbers(selectedContact.phones);
    } else {
      // Clear the form fields when adding a new contact
      setFirstName("");
      setLastName("");
      setPhoneNumbers([{ number: "" }]);
    }
  }, [isEdit, selectedContact]);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsShowModal(false);
      setIsEdit(false);
    }, 300);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { number: "" }]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = { number: value };
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regular expression to check for special characters
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

    // Check if the first name contains special characters
    if (specialCharacterRegex.test(firstName)) {
      alert("First name cannot contain special characters.");
      return;
    }

    // Check if the last name contains special characters
    if (specialCharacterRegex.test(lastName)) {
      alert("Last name cannot contain special characters.");
      return;
    }

    try {
      if (isEdit && selectedContact) {
        // Update the contact's name using the updateContact mutation
        await updateContact({
          variables: {
            id: selectedContact.id,
            _set: { first_name: firstName, last_name: lastName },
          },
        });

        // Update the contact's phone numbers individually using the updatePhoneNumbers mutation
        for (let i = 0; i < phoneNumbers.length; i++) {
          await updatePhoneNumbers({
            variables: {
              pk_columns: {
                number: selectedContact.phones[i].number,
                contact_id: selectedContact.id, // Replace with the correct ID field for phone numbers
              },
              new_phone_number: phoneNumbers[i].number,
            },
          });
        }

        // Fetch the updated contact data after the mutations
        const response = await fetchUpdatedContact(selectedContact.id);

        // Call the updateEditedContact function with the updated contact data
        updateEditedContact(response);
      } else {
        // Add a new contact if it's in add mode
        const response = await addContact({
          variables: {
            first_name: firstName,
            last_name: lastName,
            phones: phoneNumbers,
          },
        });

        // Extract the new contact data from the response
        const newContact = response.data.insert_contact.returning[0];

        // Call the updateContactsList function with the new contact data
        updateContactsList(newContact);
      }

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding/updating contact:", error);
    }
  };

  // Function to fetch the updated contact data after mutations (replace with your actual GraphQL query)
  const fetchUpdatedContact = async (contactId: any) => {
    const response = await client.query({
      query: gql`
        query GetContactById($id: Int!) {
          contact_by_pk(id: $id) {
            id
            first_name
            last_name
            phones {
              id
              number
            }
          }
        }
      `,
      variables: { id: contactId },
    });

    return response.data.contact_by_pk;
  };

  return (
    <Modal visible={visible}>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <Container>
          {isEdit ? <h2>Edit Contact</h2> : <h2>Add Contact</h2>}
          <Form onSubmit={handleFormSubmit}>
            <ContainerInput>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                type="text"
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </ContainerInput>
            <ContainerInput>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                type="text"
                id="last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </ContainerInput>
            {phoneNumbers.map((phoneNumber, index) => (
              <ContainerInput key={index}>
                <Label htmlFor={`phone-number-${index}`}>
                  Phone Number {index + 1}
                </Label>
                <ContainerButton>
                  <Input
                    type="text"
                    id={`phone-number-${index}`}
                    placeholder="Phone Number"
                    value={phoneNumber.number}
                    onChange={(e) =>
                      handlePhoneNumberChange(index, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemovePhoneNumber(index)}
                  >
                    Remove
                  </Button>
                </ContainerButton>
              </ContainerInput>
            ))}

            <Button type="button" onClick={handleAddPhoneNumber}>
              Add Phone Number
            </Button>
            <Button type="submit">
              {isEdit ? "Update Contact" : "Add Contact"}
            </Button>
          </Form>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
