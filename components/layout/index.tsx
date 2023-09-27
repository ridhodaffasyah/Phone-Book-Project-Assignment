import React, { ReactNode } from "react";
import Image from "next/image";
import { Header, Logo, ButtonExplore } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

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
      <Header>
        <Logo>
          <Image src="/images/logo-3.png" alt="logo" width={220} height={30} />
        </Logo>
        <ButtonExplore onClick={handleButtonExplore}>Explore</ButtonExplore>
      </Header>
      {children}
    </main>
  );
};

export default LayoutPages;
