import React, { useState } from "react";
import {
  BackgroundImage,
  ContentContainer,
  ImageContainer,
  Image,
  HeadlineText,
  SubHeadlineText,
  Span,
  ContainerTop,
  PaginationContainer,
  ContainerList,
  Grid,
} from "./styles";
import LayoutPages from "@/components/Layout";
import Pagination from "@/components/molecule/Pagination";
import ContactList from "@/components/atom/ListContact";
import Container from "@/components/organism/Container";

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  return (
    <LayoutPages>
      <BackgroundImage />
      <ContainerTop>
        <Container isLandingPage>
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
        <Container id="contact-list">
          <div>
            <h1>Contact List</h1>
          </div>
          <ContainerList>
            <Grid>
              {currentPageContacts.map((contact) => (
                <ContactList
                  id={contact.id}
                  name={contact.name}
                  phone={contact.phone}
                />
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
        </Container>
      </ContainerTop>
    </LayoutPages>
  );
};

export default Home;
