import styled from "@emotion/styled";

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

export const ButtonPrimary = styled.button`
  background-color: orange;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: #000;
    color: #fff;
    font-weight: 700;
  }
`;
