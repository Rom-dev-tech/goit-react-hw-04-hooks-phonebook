import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../ContactsFomr/ContactsFomr.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactsFomr extends Component {
  state = { ...INITIAL_STATE };

  onChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);

    this.reset();
    this.props.onClose();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <label className="form__label">
          <span className="form__name">Name</span>
          <input
            className="form__input"
            value={this.state.name}
            onChange={this.onChange}
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
            value={this.state.number}
            onChange={this.onChange}
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
  }
}

ContactsFomr.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default ContactsFomr;
