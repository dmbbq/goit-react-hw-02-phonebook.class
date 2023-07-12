import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
  };

  state = {
    name: '',
    number: '',
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'number') {
      const formattedValue = value.replace(/[^0-9]/g, '');
      const formattedNumber = formattedValue.replace(/(\d{3})(?=\d)/g, '$1-');
      this.setState({ [name]: formattedNumber });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const { contacts, onAddContact } = this.props;
    const existingContact = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (existingContact) {
      alert('Contact already exists');
    } else {
      onAddContact(name, number);
      this.setState({ name: '', number: '', error: null });
    }
  };

  render() {
    const { name, number, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
