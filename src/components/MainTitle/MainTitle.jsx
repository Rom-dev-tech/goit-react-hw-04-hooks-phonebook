import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title, size, direction }) => {
  return (
    <h1
      className="main__title"
      style={{ fontSize: `${size}rem`, textAlign: `${direction}` }}
    >
      {title}
    </h1>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number,
  direction: PropTypes.string,
};

export default Title;
