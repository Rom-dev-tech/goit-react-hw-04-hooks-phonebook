import { useMemo, useState } from 'react';
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
import useLocalStorage from './Hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const checkNameValidatiton = (newName) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    if (!checkNameValidatiton(name)) {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      setContacts([contact, ...contacts]);
      return;
    }

    toastr.error(`${name} is already in contacts`);
    toastrOptions();
  };

  const deleteContact = (todoId) => {
    setContacts((state) => state.filter((contact) => contact.id !== todoId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  function toggleModal() {
    setShowModal(!showModal);
  }

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

        <IconButton onClick={toggleModal} aria-label="add contact">
          <AddIcon width="20" height="20" fill="#03a9f4" />
        </IconButton>
      </FlexWrapper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactsFomr onSubmitContacts={addContact} onClose={toggleModal} />
        </Modal>
      )}

      {totalContactsCount <= 0 ? (
        <NotificatiomMessage message={'no contacts yet ...'} />
      ) : (
        <>
          <Title title="Contacts" type="h1" />
          <Filter value={filter} onChange={changeFilter} />

          <ContactsList
            contacts={getVisibleContacts}
            onDeleteContact={deleteContact}
          />
        </>
      )}
    </Container>
  );
};

export default App;
