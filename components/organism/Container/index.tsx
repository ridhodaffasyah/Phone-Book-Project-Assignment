import React from "react";
import { Container1, Container2 } from "./style";

interface ContainerProps {
  isLandingPage?: boolean;
  children?: React.ReactNode;
  id?: string;
}

const Container: React.FC<ContainerProps> = ({
  isLandingPage,
  children,
  id,
}) => {
  return isLandingPage ? (
    <Container1>{children}</Container1>
  ) : (
    <Container2 id={id}>{children}</Container2>
  );
};

export default Container;
