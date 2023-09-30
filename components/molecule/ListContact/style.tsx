import styled from "@emotion/styled";

export const ListContact = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #fff3da;
    color: #000;
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 1024px) {
    padding: 1rem 1.5rem 1rem 1.75rem;
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const List = styled.li`
  margin: 0;
  padding: 0;
`;
export const OList = styled.ol`
  margin: 0;
  padding: 0 0 0 1rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 0.6rem;
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
  width: 100%;

  @media (min-width: 320px) and (max-width: 1024px) {
    gap: 1.75rem;
  }
`;

export const ContainerFavorite = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
  justify-content: flex-end;

  @media (min-width: 320px) and (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
    gap: 0.5rem;
  }
`;

export const ContainerImage = styled.div`
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 1024px) {
    width: 30px;
    height: 30px;
  }
`;

export const ContainerIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
