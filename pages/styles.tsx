import styled from "@emotion/styled";

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  @media (max-width: 320px) {
    font-size: 0.5rem;
  }

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.75rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const DotContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: center;
`;

export const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  background-color: #000;
  border-radius: 50%;
  margin: 0 0.2rem 0 0.4rem;
  animation: bounce 0.5s ease-in-out infinite;
  &:nth-of-type(1) {
    animation-delay: 0.1s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.5rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const BackgroundImage = styled.div`
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  opacity: 0.06;
`;

export const ContainerTop = styled.div`
  overflowy: auto;
  height: 100vh;
  width: 100%;
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: end;
  position: relative;
  z-index: 2;

  @media (min-width: 320px) and (max-width: 768px) {
    width: 70%;
    height: 80%;
    margin-top: 1rem;
    margin-bottom: 2rem;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }
`;

export const ImageStyle = styled.img`
  width: 60%;
  height: auto;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5));
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  height: 100%;

  @media (min-width: 320px) and (max-width: 768px) {
    align-items: center;
    justify-content: end;
    text-align: center;
  }
`;

export const HeadlineText = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: black;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 2rem;
  }
`;

export const SubHeadlineText = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const Span = styled.span`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;
  text-decoration: underline;
  text-decoration-color: #000;
  text-decoration-thickness: 0.25rem;
  text-underline-offset: 0.2rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 1.25rem;
    text-decoration-thickness: 0.15rem;
  }
`;

export const FavoriteMessage = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 1024px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ContainerList = styled.div`
  display: flex;
  width: 100%;
  padding: 0rem 5rem 0 5rem;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    flex-direction: column;
    font-size: 0.75rem;
    padding: 0rem 0rem 0 0rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ContainerHeadline = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 1024px) {
    flex-direction: column;
    font-size: 0.75rem;
    padding: 0rem 0rem 0 0rem;
  }
`;

export const SearchInput = styled.input`
  width: 40%;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #000;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  outline: none;
  transition: all 0.25s ease-in-out;

  &:focus {
    border: 1px solid #000;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  }

  @media (min-width: 320px) and (max-width: 1024px) {
    font-size: 0.75rem;
    width: 100%;
    height: 2rem;
  }
`;

export const ContainerAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 50%;
  gap: 2rem;

  @media (min-width: 320px) and (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
  }
`;

export const ContainerAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;

  &:hover {
    cursor: pointer;
    font-weight: 700;
  }
`;

export const ContainerIcon = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeadlineContact = styled.h1`
  font-size: 2rem;
  margin-top: 1rem;

  @media (max-width: 320px) {
    font-size: 1rem;
    text-align: center;
  }

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 1.5rem;
    text-align: center;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.75rem;
    text-align: center;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 2rem;
    text-align: center;
  }
`;
