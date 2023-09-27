import styled from "@emotion/styled";

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
