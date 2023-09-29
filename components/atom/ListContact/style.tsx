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
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const List = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;
export const UList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const ContainerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
  width: 100%;
`;

export const ContainerFavorite = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
  justify-content: flex-end;
`;
