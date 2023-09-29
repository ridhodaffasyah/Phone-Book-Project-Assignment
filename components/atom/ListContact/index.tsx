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
  phone: Array<string>;
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
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget.id === "edit-btn") {
      setIsEditHovered(true);
    } else if (event.currentTarget.id === "favorite-btn") {
      setIsFavoriteHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsEditHovered(false);
    setIsFavoriteHovered(false);
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
          {phone.length > 0 ? (
            <>
              <span>Phone Number:</span>
              <UList>
                {phone?.map((item, index) => (
                  <List key={index}>
                    {index + 1}. {item}
                  </List>
                ))}
              </UList>
            </>
          ) : (
            <span>Phone number not available</span>
          )}
        </ContactContainer>
      </ContainerInfo>
      <ContainerFavorite>
        <Image
          src={
            isFavorite || isFavoriteHovered
              ? "/images/star-on.png"
              : "/images/star-off.png"
          }
          alt="star"
          id="favorite-btn"
          width={25}
          height={25}
          onClick={isFavorite ? onUnfavoriteToggle : onFavoriteToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Image
          src={isEditHovered ? "/images/edit-on.png" : "/images/edit-off.png"}
          alt="edit"
          width={25}
          height={25}
          id="edit-btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </ContainerFavorite>
    </ListContact>
  );
};

export default ContactList;
