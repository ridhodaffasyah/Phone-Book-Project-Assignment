import React from "react";
import { Header } from "./style";
import { NavbarProps } from "@/utils/interface";

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <Header>{children}</Header>;
};

export default Navbar;
