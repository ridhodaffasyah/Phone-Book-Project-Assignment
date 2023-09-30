import React, { ReactNode } from "react";
import Image from "next/image";
import Button from "../atom/Button";
import Navbar from "../molecule/Navbar";
import { Logo } from "./style";
import { LayoutProps } from "@/utils/interface";

const LayoutPages: React.FC<LayoutProps> = ({ children }) => {
  const handleButtonExplore = () => {
    const element = document.getElementById("contact-list");
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  return (
    <main>
      <Navbar>
        <Logo>
          <Image src="/images/logo-3.png" alt="logo" width={220} height={30} />
        </Logo>
        <Button isExplore text="Explore" handleButton={handleButtonExplore} />
      </Navbar>
      {children}
    </main>
  );
};

export default LayoutPages;
