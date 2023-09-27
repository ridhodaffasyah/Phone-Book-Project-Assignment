import React from "react";
import { ListContact, ContactContainer, UList, List } from "./style";

interface ListContactProps {
  id?: number;
  name?: string;
  phone?: Array<string>;
}

const ContactList: React.FC<ListContactProps> = ({ name, phone }) => {
  return (
    <ListContact>
      <ContactContainer>
        <strong>{name}</strong>
        <span>Phone Number:</span>
        {phone?.length && (
          <UList>
            {phone?.map((item, index) => (
              <List key={index}>
                {index + 1}. {item}
              </List>
            ))}
          </UList>
        )}
      </ContactContainer>
    </ListContact>
  );
};

export default ContactList;
