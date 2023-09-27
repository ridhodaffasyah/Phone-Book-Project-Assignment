import LayoutPages from "@/components/layout";
import {
  Container,
  Container2,
  BackgroundImage,
  ContentContainer,
  ImageContainer,
  Image,
  HeadlineText,
  SubHeadlineText,
  Span,
  ContainerTop,
} from "./styles";
import styled from "@emotion/styled";
import { useState } from "react";

const Home = () => {
  // Sample contact data
  const contacts = [
    { id: 1, name: "John Doe", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
    { id: 3, name: "John Doe", phone: "123-456-7890" },
    { id: 4, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
    { id: 5, name: "John Doe", phone: "123-456-7890" },
    { id: 6, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
    { id: 7, name: "John Doe", phone: "123-456-7890" },
    { id: 8, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
    { id: 9, name: "John Doe", phone: "123-456-7890" },
    { id: 10, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
    { id: 11, name: "John Doe", phone: "123-456-7890" },
    { id: 12, name: "Jane Smith", phone: "987-654-3210" },
    // Add more contacts as needed
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the contacts for the current page
  const currentPageContacts = contacts.slice(startIndex, endIndex);

  const ContainerList = styled.div`
    display: flex;
    width: 100%;
    padding: 0rem 5rem 0 5rem;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 320px) and (max-width: 768px) {
      flex-direction: column;
      font-size: 0.75rem;
      padding: 0rem 0rem 0 0rem;
    }
  `;

  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (min-width: 320px) and (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `;

  const ListContact = styled.div`
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

  const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;

  const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    @media (min-width: 320px) and (max-width: 768px) {
      justify-content: center;
      align-items: center;
    }
  `;

  const PageItem = styled.a`
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


    @media (min-width: 320px) and (max-width: 768px) {
      padding: 0.5rem 0.75rem;
      margin: 0 0.25rem 2rem 0.25rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
    }
  `;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <PaginationContainer>
        {pages.map((page) => (
          <PageItem
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageItem>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <LayoutPages>
      <BackgroundImage />
      <ContainerTop>
        <Container>
          <ContentContainer>
            <HeadlineText>Phone Book Project</HeadlineText>
            <SubHeadlineText>
              <Span>Connect</Span> with your friends, family, and also the
              world!
            </SubHeadlineText>
          </ContentContainer>
          <ImageContainer>
            <Image src="/images/cartoon-2.png" alt="cartoon" />
          </ImageContainer>
        </Container>
        <Container2 id="contact-list">
          <div>
            <h1>Contact List</h1>
          </div>
          <ContainerList>
            <Grid>
              {currentPageContacts.map((contact) => (
                <ListContact key={contact.id}>
                  <ContactContainer>
                    <strong>{contact.name}</strong>
                    <p>{contact.phone}</p>
                  </ContactContainer>
                </ListContact>
              ))}
            </Grid>
          </ContainerList>
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        </Container2>
      </ContainerTop>
    </LayoutPages>
  );
};

export default Home;
