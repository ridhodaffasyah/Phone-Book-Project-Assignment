import styled from "@emotion/styled";

interface ModalProps {
  visible: boolean; // Declare the visible prop
}

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 2rem;
  border-radius: 0.25rem;
  width: 75%;
  max-height: 80vh;
  overflow-y: auto;

  @media (min-width: 320px) and (max-width: 425px) {
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: orange;
    text-decoration: none;
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 425px) {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 320px) and (max-width: 425px) {
    gap: 0.25rem;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (min-width: 320px) and (max-width: 425px) {
    gap: 0.25rem;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 700;

  @media (min-width: 320px) and (max-width: 425px) {
    font-size: 0.75rem;
  }
`;

export const Input = styled.input`
  padding: 1rem 0.5rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  font-size: 1rem;
  height: 2rem;
  outline: none;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:focus {
    border: 1px solid #000;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  }

  @media (min-width: 320px) and (max-width: 425px) {
    font-size: 0.75rem;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    border: 1px solid orange;
    background-color: orange;
    color: #fff;
  }

  @media (min-width: 320px) and (max-width: 425px) {
    font-size: 0.75rem;
  }
`;

export const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.25rem;

  @media (min-width: 320px) and (max-width: 425px) {
    gap: 0.25rem;
  }
`;
