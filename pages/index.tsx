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

import { gql } from "@apollo/client";
import createApolloClient from "../apollo-client";

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query GetContactList(
        $distinct_on: [contact_select_column!]
        $limit: Int
        $offset: Int
        $order_by: [contact_order_by!]
        $where: contact_bool_exp
      ) {
        contact(
          distinct_on: $distinct_on
          limit: $limit
          offset: $offset
          order_by: $order_by
          where: $where
        ) {
          created_at
          first_name
          id
          last_name
          phones {
            number
          }
        }
      }
    `,
  });

  return {
    props: {
      contacts: data.contact,
    },
  };
}

interface HomeProps {
  contacts: [
    {
      created_at: string;
      first_name: string;
      id: number;
      last_name: string;
      phones: [
        {
          number: string;
        }
      ];
    }
  ];
}

const Home: React.FC<HomeProps> = ({ contacts }) => {
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
            <h1>Favorite Contact</h1>
          </div>
          <ContainerList>
            <Grid>
              {currentPageContacts.map((contact) => (
                <ContactList
                  key={contact.id}
                  id={contact.id}
                  name={contact.first_name + " " + contact.last_name}
                  phone={contact.phones.map((phone) => phone.number)}
                />
              ))}
            </Grid>
          </ContainerList>
          <div>
            <h1>Contact List</h1>
          </div>
          <ContainerList>
            <Grid>
              {currentPageContacts.map((contact) => (
                <ContactList
                  key={contact.id}
                  id={contact.id}
                  name={contact.first_name + " " + contact.last_name}
                  phone={contact.phones.map((phone) => phone.number)}
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
