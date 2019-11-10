import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ value, onChange, onSearch }) => (
  <div>
    <input type="text" value={value} onChange={onChange} />
    <button type="button" onClick={onSearch}>
      Search
    </button>
  </div>
);

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
