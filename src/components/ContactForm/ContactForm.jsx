import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

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
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

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
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}


export default ContactForm;
