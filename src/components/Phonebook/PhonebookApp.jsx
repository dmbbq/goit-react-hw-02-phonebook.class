// PhonebookApp.js
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class PhonebookApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const existingContact = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (existingContact) {
      alert('Contact already exists');
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState({
        contacts: [...contacts, newContact],
        name: '',
        number: '',
      });
    }
  };

  handleNumberInputChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/[^0-9]/g, '');
    const formattedNumber = formattedValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    this.setState({ number: formattedNumber });
  };

  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };

  handleDeleteContact = (contactId) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts, filter, name, number } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={contacts} 
          name={name}
          number={number}
          onInputChange={this.handleInputChange}
          onAddContact={this.handleAddContact}
          onNumberInputChange={this.handleNumberInputChange}
        />

        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} />

        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default PhonebookApp;
