import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { Link as ScrollLink } from 'react-scroll';

const ScrollingLink = ({
  containerId,
  offset = 0,
  duration = 300,
  label,
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
    {label}
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
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ScrollingLink;
