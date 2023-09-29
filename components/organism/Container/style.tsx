import styled from "@emotion/styled";

export const Container1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 5rem 0 10rem;

  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
    padding: 0 0 0 0;
  }
`;

export const Container2 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem 5rem 0 5rem;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 1rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    flex-direction: column;
    padding: 0 1rem 0 1rem;
  }
`;
