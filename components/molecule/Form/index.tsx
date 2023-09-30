import React, { useState } from "react";
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
}

const FormModal: React.FC<FormModalProps> = ({ setIsShowModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [visible, setVisible] = useState(true);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsShowModal(false);
    }, 300);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
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

    // Your logic to submit the form when the first name and last name are valid
    console.log("Form submitted with First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone Numbers:", phoneNumbers);
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
                    value={phoneNumber}
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
