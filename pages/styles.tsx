import styled from "@emotion/styled";

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  @media (max-width: 320px) {
    font-size: 0.5rem;
  };

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.75rem;
  };

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
  };

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.25rem;
  };
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
  width: 100vw;
  opacity: 0.06;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 100%;

  @media (min-width: 320px) and (max-width: 768px){
    flex-direction: column;
  };
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: end;
  position: relative;
  z-index: 2;

  @media (min-width: 320px) and (max-width: 768px){
    width: 100%;
    height: 80%;
    margin-top: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  };
`;

export const Image = styled.img`
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
  };
`;

export const HeadlineText = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: black;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (max-width: 320px) {
    font-size: 2rem;
  };

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 2.5rem;
  };

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 3rem;
  };

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 4rem;
  };
`;

export const SubHeadlineText = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;

  @media (max-width: 320px) {
    font-size: 1rem;
  };

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 1.25rem;
  };

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem;
  };

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.75rem;
  };
`;

export const Span = styled.span`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;
  text-decoration: underline;
  text-decoration-color: #000;
  text-decoration-thickness: 0.2rem;
  text-underline-offset: 0.2rem;

  @media (max-width: 320px) {
    font-size: 1rem;
  };

  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 1.25rem;
  };

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem;
  };

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.75rem;
  };
`;
