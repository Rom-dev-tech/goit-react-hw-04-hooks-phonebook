import React from 'react';
import PropTypes from 'prop-types';
import '../Filter/Filter.scss';

const Filter = ({ value, onChange }) => (
  <div className="filter__wrapper">
    <label className="filter__label">
      <span className="filter__name">Find contacts by name</span>
      <input
        className="filter__input"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
