import styled from "@emotion/styled";

export const PageItem = styled.a`
  padding: 0.5rem 0.75rem;
  margin: 0 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  color: #333;

  &:hover {
    background-color: orange;
    color: #fff;
  }

  &.active {
    background-color: orange;
    color: #fff;
    border-color: orange;
  }

  @media (min-width: 320px) and (max-width: 1024px) {
    padding: 0.5rem 0.75rem;
    margin: 0 0.25rem 2rem 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    color: #333;
  }
`;
