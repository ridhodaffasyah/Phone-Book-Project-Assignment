import React from "react";
import Image from "next/image";
import { PopupMessageProps } from "@/utils/interface";
import { PopupMessageContainer, Container } from "./style";

const PopupMessage: React.FC<PopupMessageProps> = ({ message, type }) => {
  return (
    <PopupMessageContainer>
      <Container>
        <Image
          src={
            type === "success" ? "/images/success.png" : "/images/failed.png"
          }
          alt="icon-msg"
          width={25}
          height={25}
        />
        <p>{message}</p>
      </Container>
    </PopupMessageContainer>
  );
};

export default PopupMessage;
