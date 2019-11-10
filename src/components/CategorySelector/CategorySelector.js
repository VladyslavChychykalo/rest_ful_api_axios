import React from 'react';
import PropTypes from 'prop-types';

const CategorySelector = ({ options, value, onChange }) => (
  <select value={value} onChange={onChange}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

CategorySelector.propTypes = {
  options: PropTypes.arrayOf().isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategorySelector;
