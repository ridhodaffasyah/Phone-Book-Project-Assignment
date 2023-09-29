import React, { useState } from "react";
import Image from "next/image";
import {
  ListContact,
  ContactContainer,
  UList,
  List,
  ContainerInfo,
  ContainerFavorite,
} from "./style";

interface ListContactProps {
  id?: number;
  name?: string;
  phone?: Array<string>;
  onFavoriteToggle?: () => void;
  onUnfavoriteToggle?: () => void;
  isFavorite?: boolean;
}

const ContactList: React.FC<ListContactProps> = ({
  name,
  phone,
  onFavoriteToggle,
  onUnfavoriteToggle,
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ListContact>
      <ContainerInfo>
        <Image
          src="/images/profile.jpg"
          alt="profile"
          width={75}
          height={75}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            border: "1px solid grey",
          }}
        />
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
      </ContainerInfo>
      <ContainerFavorite
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={
            isFavorite || isHovered
              ? "/images/star-on.png"
              : "/images/star-off.png"
          }
          alt="star"
          id="favorite-btn"
          width={25}
          height={25}
          onClick={isFavorite ? onUnfavoriteToggle : onFavoriteToggle}
        />
      </ContainerFavorite>
    </ListContact>
  );
};

export default ContactList;
