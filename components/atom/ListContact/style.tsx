import styled from "@emotion/styled";

export const ListContact = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover {
    background-color: orange;
    color: #fff;
    font-weight: 700;
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
