import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChange }) => {
    Filter.propTypes = {
        onChange: PropTypes.func.isRequired,
      };
  const handleInputChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <input
      type="text"
      onChange={handleInputChange}
      placeholder="Search contacts"
    />
  );
};

export default Filter;