import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 5rem 1rem 5rem;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  max-width: 30%;
  height: auto;

    @media (min-width: 320px) and (max-width: 768px) {
        max-width: 100%;
        justify-content: center;
    }
`;

export const ButtonExplore = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: orange;
    color: #fff;
    font-weight: 700;
  }

    @media (min-width: 320px) and (max-width: 768px) {
        display: none;
    }
`;
