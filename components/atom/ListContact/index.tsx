import React from "react";
import { ListContact, ContactContainer } from "./style";

interface ListContactProps {
  id?: number;
  name?: string;
  phone?: string;
}

const ContactList: React.FC<ListContactProps> = ({ id, name, phone }) => {
  return (
    <ListContact>
      <ContactContainer>
        <strong>{name}</strong>
        <p>{phone}</p>
      </ContactContainer>
    </ListContact>
  );
};

export default ContactList;
