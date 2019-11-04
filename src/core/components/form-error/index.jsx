import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  error: {
    fontSize: 14,
    fontWeight: 500,
    height: 21,
    marginBottom: 4,
  },
});

const FormError = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography color="error" className={classes.error}>
      {children}
    </Typography>
  );
};

FormError.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormError;
