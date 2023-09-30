import React, { useState } from "react";
import Image from "next/image";
import {
  ListContact,
  ContactContainer,
  OList,
  List,
  ContainerInfo,
  ContainerFavorite,
  ContainerImage,
  ContainerIcon,
} from "./style";

interface ListContactProps {
  id?: number;
  name?: string;
  phone: Array<string>;
  onFavoriteToggle?: () => void;
  onUnfavoriteToggle?: () => void;
  onRemoveContact?: () => void;
  isFavorite?: boolean;
}

const ContactList: React.FC<ListContactProps> = ({
  name,
  phone,
  onFavoriteToggle,
  onUnfavoriteToggle,
  onRemoveContact,
  isFavorite,
}) => {
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget.id === "edit-btn") {
      setIsEditHovered(true);
    } else if (event.currentTarget.id === "favorite-btn") {
      setIsFavoriteHovered(true);
    } else if (event.currentTarget.id === "delete-btn") {
      setIsDeleteHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsEditHovered(false);
    setIsFavoriteHovered(false);
    setIsDeleteHovered(false);
  };

  return (
    <ListContact>
      <ContainerInfo>
        <ContainerImage>
          <Image
            src="/images/profile.jpg"
            alt="profile"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
              border: "1px solid grey",
            }}
          />
        </ContainerImage>
        <ContactContainer>
          <strong>{name}</strong>
          {phone.length > 0 ? (
            <>
              <span>Phone Number:</span>
              <OList type="1">
                {phone?.map((item, index) => (
                  <List key={index}>{item}</List>
                ))}
              </OList>
            </>
          ) : (
            <span>Phone number not available</span>
          )}
        </ContactContainer>
      </ContainerInfo>
      <ContainerFavorite>
        <ContainerIcon>
          <Image
            src={
              isFavorite || isFavoriteHovered
                ? "/images/star-on.png"
                : "/images/star-off.png"
            }
            alt="star"
            id="favorite-btn"
            width={20}
            height={20}
            onClick={isFavorite ? onUnfavoriteToggle : onFavoriteToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </ContainerIcon>
        <ContainerIcon>
          <Image
            src={isEditHovered ? "/images/edit-on.png" : "/images/edit-off.png"}
            alt="edit"
            width={20}
            height={20}
            id="edit-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </ContainerIcon>
        <ContainerIcon>
          <Image
            src={
              isDeleteHovered
                ? "/images/delete-on.png"
                : "/images/delete-off.png"
            }
            alt="delete"
            width={20}
            height={20}
            id="delete-btn"
            onClick={onRemoveContact}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </ContainerIcon>
      </ContainerFavorite>
    </ListContact>
  );
};

export default ContactList;
