import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    color: 'black',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 1.5,
  },
});

const SectionHeader = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="button"
      component="h6"
      gutterBottom
      className={classes.header}
    >
      {children}
    </Typography>
  );
};

SectionHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SectionHeader;
