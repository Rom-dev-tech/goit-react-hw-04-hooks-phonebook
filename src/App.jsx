import React, { Component } from 'react';
import shortid from 'shortid';
import toastr from 'toastr';
import toastrOptions from './components/Notification';
import Container from './components/Container';
import ContactsFomr from './components/ContactsFomr';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import NotificatiomMessage from './components/NotificatiomMessage';
import Clock from './components/Clock';
import Title from './components/Title';
import MainTitle from './components/MainTitle';
import Сounter from './components/Сounter';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
import FlexWrapper from './components/FlexWrapper';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  checkNameValidatiton = (newName) => {
    const contacts = this.state.contacts;
    return contacts.find(({ name }) => name === newName);
  };

  addContact = ({ name, number }) => {
    if (!this.checkNameValidatiton(name)) {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
      return;
    }

    toastr.error(`${name} is already in contacts`);
    toastrOptions();
  };

  deleteContact = (todoId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== todoId),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { contacts, filter, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const totalContactsCount = contacts.length;
    return (
      <Container>
        <Clock direction="end" size={30} />
        <MainTitle title="Phonebook" size={5} direction="center" />

        <FlexWrapper>
          <Сounter
            title="Total contacts:"
            totalContactsCount={totalContactsCount}
          />

          <IconButton onClick={this.toggleModal} aria-label="add contact">
            <AddIcon width="20" height="20" fill="#03a9f4" />
          </IconButton>
        </FlexWrapper>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactsFomr
              onSubmit={this.addContact}
              onClose={this.toggleModal}
            />
          </Modal>
        )}

        {totalContactsCount <= 0 ? (
          <NotificatiomMessage message={'no contacts yet ...'} />
        ) : (
          <>
            <Title title="Contacts" type="h1" />
            <Filter value={filter} onChange={this.changeFilter} />

            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
}

export default App;
