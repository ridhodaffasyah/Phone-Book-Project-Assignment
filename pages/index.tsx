import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BackgroundImage,
  ContentContainer,
  ImageContainer,
  ImageStyle,
  HeadlineText,
  HeadlineContact,
  SubHeadlineText,
  Span,
  ContainerTop,
  PaginationContainer,
  ContainerList,
  Grid,
  FavoriteMessage,
  ContainerHeadline,
  SearchInput,
  ContainerAction,
  ContainerAdd,
  ContainerIcon,
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
      data: data.contact,
    },
  };
}

interface HomeProps {
  data: [
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

interface Contacts {
  id: number;
  first_name: string;
  last_name: string;
  phones: [
    {
      number: string;
    }
  ];
}

interface FavoriteContact {
  id: number;
  first_name: string;
  last_name: string;
  phones: [
    {
      number: string;
    }
  ];
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState(data as Contacts[]);
  const [favoriteContacts, setFavoriteContacts] = useState(
    [] as FavoriteContact[]
  );
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setContacts(data as Contacts[]);
    } else {
      const filteredContacts = data.filter((contact) => {
        return (
          contact.first_name.toLowerCase().includes(e.target.value) ||
          contact.last_name.toLowerCase().includes(e.target.value)
        );
      });

      setContacts(filteredContacts as Contacts[]);
    }
  };

  useEffect(() => {
    // Load favorite contacts from sessionStorage when the component mounts
    const savedFavoriteContacts = localStorage.getItem("favoriteContacts");
    if (savedFavoriteContacts) {
      setFavoriteContacts(JSON.parse(savedFavoriteContacts));
    }
  }, []);

  useEffect(() => {
    // Filter out the favorite contacts from the contacts list
    const filteredContacts = contacts.filter(
      (contact) =>
        !favoriteContacts.some((favContact) => favContact.id === contact.id)
    );

    setContacts(filteredContacts);
  }, [favoriteContacts]);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the contacts for the current page
  const currentPageContacts = contacts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handleFavoriteToggle = (contactId: number) => {
    // Check if the contact is already in the favorite list
    const isAlreadyFavorite = favoriteContacts.some(
      (contact) => contact.id === contactId
    );

    if (isAlreadyFavorite) {
      // If it's already in the list, remove it from favoriteContacts
      const updatedFavoriteContacts = favoriteContacts.filter(
        (contact) => contact.id !== contactId
      );
      setFavoriteContacts(updatedFavoriteContacts);
    } else {
      // If it's not in the list, add it to favoriteContacts
      const contactToAdd = contacts.find((contact) => contact.id === contactId);
      if (contactToAdd) {
        const updatedFavoriteContacts = [
          ...favoriteContacts,
          contactToAdd,
        ].sort((a, b) => a.id - b.id);
        setFavoriteContacts(updatedFavoriteContacts);

        // Save favoriteContacts to localStorage
        localStorage.setItem(
          "favoriteContacts",
          JSON.stringify(updatedFavoriteContacts)
        );
      }
    }

    // Remove it from the contacts list if it's not a favorite
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    setContacts(updatedContacts);
  };

  const handleUnfavoriteToggle = (contactId: number) => {
    // Check if the contact is in the favorite list
    const isFavorite = favoriteContacts.some(
      (contact) => contact.id === contactId
    );

    if (isFavorite) {
      // If it's in the list, remove it from favoriteContacts
      const updatedFavoriteContacts = favoriteContacts.filter(
        (contact) => contact.id !== contactId
      );
      setFavoriteContacts(updatedFavoriteContacts);

      // Save favoriteContacts to localStorage
      localStorage.setItem(
        "favoriteContacts",
        JSON.stringify(updatedFavoriteContacts)
      );

      // Add it to the contacts list
      const contactToAdd = favoriteContacts.find(
        (contact) => contact.id === contactId
      );
      if (contactToAdd) {
        setContacts([...contacts, contactToAdd]);
      }
    }
  };

  console.log(contacts);

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
            <ImageStyle src="/images/cartoon-2.png" alt="cartoon" />
          </ImageContainer>
        </Container>
        <Container id="contact-list">
          <HeadlineContact>Favorite Contact</HeadlineContact>
          {favoriteContacts.length === 0 ? (
            <FavoriteMessage>
              You don't have any favorite contact yet.
            </FavoriteMessage>
          ) : (
            <ContainerList>
              <Grid>
                {favoriteContacts.map((contact) => (
                  <ContactList
                    key={contact.id}
                    id={contact.id}
                    name={contact.first_name + " " + contact.last_name}
                    phone={contact.phones.map((phone) => phone.number)}
                    isFavorite={favoriteContacts.some(
                      (favContact) => favContact.id === contact.id
                    )}
                    onUnfavoriteToggle={() =>
                      handleUnfavoriteToggle(contact.id)
                    }
                  />
                ))}
              </Grid>
            </ContainerList>
          )}
          <ContainerHeadline>
            <HeadlineContact>Contact List</HeadlineContact>
            <ContainerAction>
              <ContainerAdd>
                <ContainerIcon>
                  <Image
                    src="/images/add.png"
                    alt="add"
                    width={25}
                    height={25}
                  />
                </ContainerIcon>
                <span>Add Contact</span>
              </ContainerAdd>
              <SearchInput
                type="text"
                placeholder="Search Contact..."
                onInput={handleSearch}
              />
            </ContainerAction>
          </ContainerHeadline>
          <ContainerList>
            <Grid>
              {contacts.length > 0 ? (
                currentPageContacts.map((contact) => (
                  <ContactList
                    key={contact.id}
                    id={contact.id}
                    name={contact.first_name + " " + contact.last_name}
                    phone={contact.phones.map((phone) => phone.number)}
                    onFavoriteToggle={() => handleFavoriteToggle(contact.id)}
                  />
                ))
              ) : (
                <span>No more contacts.</span>
              )}
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
