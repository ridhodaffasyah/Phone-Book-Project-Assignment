import React from "react";
import { ButtonExplore, ButtonPrimary } from "./style";

interface ButtonProps {
  isExplore?: boolean;
  text: string;
  handleButton?: () => void;
}

const Button: React.FC<ButtonProps> = ({ isExplore, text, handleButton }) => {
  return isExplore ? (
    <ButtonExplore onClick={handleButton}>{text}</ButtonExplore>
  ) : (
    <ButtonPrimary onClick={handleButton}>{text}</ButtonPrimary>
  );
};

export default Button;
