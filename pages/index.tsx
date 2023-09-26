import styled from '@emotion/styled'

const HeadlineText = styled.h1`
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  &:hover {
    color: #FF0000;
  }
`;

export default function Home() {
  return (
    <>
      <HeadlineText>Next.js + TypeScript + Emotion</HeadlineText>
    </>
  )
}
