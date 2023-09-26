import React, { ReactNode } from "react";
import Image from "next/image";
import { Header, Logo, ButtonExplore } from "./styles";

interface LayoutProps {
  children: ReactNode; // Use ReactNode type for children prop
}

const LayoutPages = ({ children }: LayoutProps): JSX.Element => {
  return (
    <main>
      <Header>
        <Logo>
          <Image src="/images/logo-3.png" alt="logo" width={220} height={30} />
        </Logo>
        <ButtonExplore>Explore</ButtonExplore>
      </Header>
      {children} {/* Render the children */}
    </main>
  );
};

export default LayoutPages;
