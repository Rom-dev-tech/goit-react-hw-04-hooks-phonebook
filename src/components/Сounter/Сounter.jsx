import React from 'react';
import PropTypes from 'prop-types';

const Сounter = ({ title, totalContactsCount }) => {
  return (
    <div style={{ fontSize: '2rem' }}>
      {title} {totalContactsCount}
    </div>
  );
};

Сounter.propTypes = {
  title: PropTypes.string.isRequired,
  totalContactsCount: PropTypes.number,
};

export default Сounter;
