import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    color: theme.palette.primary.dark,

    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
}));

const LinkStyledButton = ({ onClick, children }) => {
  const classes = useStyles();

  return (
    <Button
      disableRipple
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

LinkStyledButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LinkStyledButton;
