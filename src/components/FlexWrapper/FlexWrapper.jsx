import React from 'react';
import PropTypes from 'prop-types';
import '../FlexWrapper/FlexWrapper.scss';

const FlexWrapper = ({ children }) => (
  <div className="flex__wrapper">{children}</div>
);

FlexWrapper.propTypes = {
  children: PropTypes.node,
};

export default FlexWrapper;
