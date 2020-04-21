import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link as ScrollLink } from 'react-scroll';

const ScrollingButton = ({
  containerId,
  offset = 0,
  duration = 300,
  label,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    component={ScrollLink}
    to={containerId}
    offset={offset}
    spy
    smooth
    duration={duration}
  >
    {label}
  </Button>
);

ScrollingButton.defaultProps = {
  offset: 0,
  duration: 300,
};

ScrollingButton.propTypes = {
  containerId: PropTypes.string.isRequired,
  offset: PropTypes.number,
  duration: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default ScrollingButton;
