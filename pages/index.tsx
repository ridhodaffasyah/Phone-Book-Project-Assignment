import LayoutPages from "@/components/layout";
import {
  Container,
  BackgroundImage,
  ContentContainer,
  ImageContainer,
  Image,
  HeadlineText,
  SubHeadlineText,
  Span,
} from "./styles";

const Home = () => {
  return (
    <LayoutPages>
      <BackgroundImage />
      <Container>
        <ContentContainer>
          <HeadlineText>Phone Book</HeadlineText>
          <HeadlineText>Project</HeadlineText>
          <SubHeadlineText>
            <Span>Connect</Span> with your friends, family, and also the world!
          </SubHeadlineText>
        </ContentContainer>
        <ImageContainer>
          <Image src="/images/cartoon-2.png" alt="cartoon" />
        </ImageContainer>
      </Container>
    </LayoutPages>
  );
};

export default Home;
