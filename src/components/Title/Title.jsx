import React from 'react';
import PropTypes from 'prop-types';
import '../Title/Title.scss';

const Title = ({ title, type }) => {
  return <h2 className={`title ${type}`}>{title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Title;
