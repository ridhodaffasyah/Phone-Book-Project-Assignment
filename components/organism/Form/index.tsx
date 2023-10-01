import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import createApolloClient from "@/apollo-client";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  UPDATE_PHONE_NUMBERS,
  ADD_PHONE_NUMBER,
  FETCH_UPDATED_CONTACT,
} from "@/utils/api";
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
import { FormModalProps } from "@/utils/interface";

const FormModal: React.FC<FormModalProps> = ({
  setIsShowModal,
  updateContactsList,
  updateEditedContact,
  showErrorMessage,
  showSuccessMessage,
  setIsEdit,
  isEdit,
  selectedContact,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([{ number: "" }]);
  const [visible, setVisible] = useState(true);

  const client = createApolloClient();

  const [addContact] = useMutation(ADD_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [updatePhoneNumbers] = useMutation(UPDATE_PHONE_NUMBERS);
  const [addPhoneNumber] = useMutation(ADD_PHONE_NUMBER);

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
      showErrorMessage("First name cannot contain special characters.");
      return;
    }

    // Check if the last name contains special characters
    if (specialCharacterRegex.test(lastName)) {
      showErrorMessage("Last name cannot contain special characters.");
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

        /* Add a new phone number using the addPhoneNumber mutation
        Check first if there's a new phone number to add or length phoneNumbers is greater than selectedContact.phones */
        if (
          phoneNumbers.length > selectedContact.phones.length ||
          phoneNumbers.length < selectedContact.phones.length
        ) {
          await addPhoneNumber({
            variables: {
              contact_id: selectedContact.id,
              phone_number: phoneNumbers[phoneNumbers.length - 1].number,
            },
          });
        } else {
          // Update the contact's phone numbers individually using the updatePhoneNumbers mutation
          for (let i = 0; i < phoneNumbers.length; i++) {
            await updatePhoneNumbers({
              variables: {
                pk_columns: {
                  number: selectedContact.phones[i].number,
                  contact_id: selectedContact.id,
                },
                new_phone_number: phoneNumbers[i].number,
              },
            });
          }
        }

        // Fetch the updated contact data after the mutations
        const response = await fetchUpdatedContact(selectedContact.id);

        updateEditedContact(response);

        showSuccessMessage("Contact edited successfully");
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

        updateContactsList(newContact);

        showSuccessMessage("Contact added successfully");
      }

      // Close the modal
      handleCloseModal();
    } catch (error) {
      showErrorMessage("Failed adding or updating contact");
    }
  };

  // Function to fetch the updated contact data after mutations (replace with your actual GraphQL query)
  const fetchUpdatedContact = async (contactId: any) => {
    const response = await client.query({
      query: FETCH_UPDATED_CONTACT,
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
