import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { Link as ScrollLink } from 'react-scroll';

const ScrollingLink = ({
  containerId,
  offset = 0,
  duration = 300,
  children,
  className = '',
  ...linkProps
}) => (
  <Link
    className={className}
    style={{ cursor: 'pointer' }}
    component={ScrollLink}
    offset={offset}
    to={containerId}
    spy
    smooth
    duration={duration}
    {...linkProps}
  >
    {children}
  </Link>
);

ScrollingLink.defaultProps = {
  duration: 300,
  offset: 0,
  className: '',
};

ScrollingLink.propTypes = {
  containerId: PropTypes.string.isRequired,
  offset: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default ScrollingLink;
