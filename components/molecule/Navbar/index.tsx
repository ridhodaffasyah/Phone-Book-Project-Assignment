import React from "react";
import { Header } from "./style";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <Header>{children}</Header>;
};

export default Navbar;
