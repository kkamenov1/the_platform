import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  searchButton: {
    backgroundColor: 'rgb(255, 90, 95)',
    width: '100%',
    textTransform: 'none',
    padding: '9px 8px',

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
});

const SimpleButton = ({ children, ...other }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.searchButton}
      disableRipple
      {...other}
    >
      {children}
    </Button>
  );
};

SimpleButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SimpleButton;
