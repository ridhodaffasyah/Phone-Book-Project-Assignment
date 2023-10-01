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
import ContactList from "@/components/molecule/ListContact";
import Container from "@/components/organism/Container";
import FormModal from "@/components/organism/Form";
import PopupMessage from "@/components/atom/PopupMessage";

import { useMutation } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { DELETE_CONTACT, GET_CONTACTS_LIST } from "@/utils/api";
import { Contacts, FavoriteContact, HomeProps } from "@/utils/interface";

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: GET_CONTACTS_LIST,
  });

  return {
    props: {
      data: data.contact,
    },
  };
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState(data as Contacts[]);
  const [favoriteContacts, setFavoriteContacts] = useState(
    [] as FavoriteContact[]
  );
  const [search, setSearch] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [deleteContact] = useMutation(DELETE_CONTACT);

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

    showSuccessMessage("Added to favorite successfully");
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

  const handleAddContact = () => {
    setIsShowModal(true);
  };

  const showSuccessMessage = (message: string) => {
    setIsSuccess(true);
    setMessage(message);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setMessage("");
    }, 3000);
  };

  const showErrorMessage = (message: string) => {
    setIsError(true);
    setMessage(message);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setIsError(false);
      setMessage("");
    }, 3000);
  };

  const handleRemoveContact = async (contactId: number) => {
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
    }

    // Remove it from the contacts list
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    setContacts(updatedContacts);

    // Remove it from the database
    try {
      // Remove it from the database
      await deleteContact({
        variables: {
          id: contactId,
        },
      });

      showSuccessMessage("Contact deleted successfully");
    } catch (err) {
      showErrorMessage("Failed to delete contact");
    }
  };

  const updateContactsList = (newContact: any) => {
    // Update the contacts state with the new contact
    setContacts([...contacts, newContact]);
  };

  const updateEditedContact = (updatedContact: any) => {
    // Update the contacts state with the updated contact
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );

    // Update the favoriteContacts state with the updated contact
    const updatedFavoriteContacts = favoriteContacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );

    // Save favoriteContacts to localStorage
    localStorage.setItem(
      "favoriteContacts",
      JSON.stringify(updatedFavoriteContacts)
    );

    setFavoriteContacts(updatedFavoriteContacts);
    setContacts(updatedContacts);
  };

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setIsEdit(true);
    setIsShowModal(true);
  };

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
                    onFavoriteToggle={() => handleFavoriteToggle(contact.id)}
                    onUnfavoriteToggle={() =>
                      handleUnfavoriteToggle(contact.id)
                    }
                    onRemoveContact={() => handleRemoveContact(contact.id)}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onClick={() => handleContactClick(contact)}
                  />
                ))}
              </Grid>
            </ContainerList>
          )}
          <ContainerHeadline>
            <HeadlineContact>Contact List</HeadlineContact>
            <ContainerAction>
              <ContainerAdd onClick={handleAddContact}>
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
                    isFavorite={favoriteContacts.some(
                      (favContact) => favContact.id === contact.id
                    )}
                    onFavoriteToggle={() => handleFavoriteToggle(contact.id)}
                    onUnfavoriteToggle={() =>
                      handleUnfavoriteToggle(contact.id)
                    }
                    onRemoveContact={() => handleRemoveContact(contact.id)}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onClick={() => handleContactClick(contact)}
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
      {isSuccess && <PopupMessage message={message} type="success" />}
      {isError && <PopupMessage message={message} type="error" />}
      {(isShowModal || isEdit) && (
        <FormModal
          setIsShowModal={setIsShowModal}
          updateContactsList={updateContactsList}
          updateEditedContact={updateEditedContact}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedContact={selectedContact}
          showErrorMessage={showErrorMessage}
          showSuccessMessage={showSuccessMessage}
        />
      )}
    </LayoutPages>
  );
};

export default Home;
