import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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
}

const FormModal: React.FC<FormModalProps> = ({
  setIsShowModal,
  updateContactsList,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([{ number: "" }]);
  const [visible, setVisible] = useState(true);

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

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsShowModal(false);
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
      const response = await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phoneNumbers,
        },
      });

      // Extract the new contact data from the response (adjust this based on your GraphQL schema)
      const newContact = response.data.insert_contact.returning[0];

      // Call the updateContactsList function with the new contact data
      updateContactsList(newContact);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Modal visible={visible}>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <Container>
          <h1>Add Contact</h1>
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
                    onClick={() => handleRemovePhoneNumber(index)} // Call the remove function with the index
                  >
                    Remove
                  </Button>
                </ContainerButton>
              </ContainerInput>
            ))}

            <Button type="button" onClick={handleAddPhoneNumber}>
              Add Phone Number
            </Button>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
