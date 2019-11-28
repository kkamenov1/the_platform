import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    fontWeight: theme.typography.fontWeightMedium,
    height: 21,
    marginBottom: 4,
  },
}));

const FormError = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography color="error" className={classes.error}>
      {children}
    </Typography>
  );
};

FormError.defaultProps = {
  children: null,
};

FormError.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormError;
