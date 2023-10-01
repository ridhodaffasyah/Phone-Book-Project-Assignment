import styled from "@emotion/styled";

export const PopupMessageContainer = styled.div`
  position: fixed;
  top: 5%;
  right: 2%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1rem;
    font-weight: 700;
  }

  @media (min-width: 320px) and (max-width: 425px) {
    p {
      font-size: 0.75rem;
    }
    right: 4%;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #000;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  gap: 1rem;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0.5rem 0.5rem;
    font-size: 0.75rem;
    gap: 0.5rem;

    p {
      font-size: 0.75rem;
    }

    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;
