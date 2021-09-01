import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import '../ContactsFomr/ContactsFomr.scss';

const ContactsFomr = ({ onSubmitContacts, onClose }) => {
  const inputName = useInput('');
  const inputNumber = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();

    const name = inputName.value;
    const number = inputNumber.value;

    onSubmitContacts({ name, number });

    onClose();
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="form__label">
        <span className="form__name">Name</span>
        <input
          {...inputName.bind}
          className="form__input"
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Nikoly Mosalov"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
          required
        />
      </label>

      <label className="form__label">
        <span className="form__name">Number</span>
        <input
          className="form__input"
          {...inputNumber.bind}
          autoComplete="off"
          type="tel"
          name="number"
          placeholder="+38067-777-77-77"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="The phone number must be digits and can contain spaces, dashes, parentheses and can start with + "
          required
        />
      </label>
      <button className="form__button" type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactsFomr.propTypes = {
  onSubmitContacts: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default ContactsFomr;
