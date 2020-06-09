import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles({
  label: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
    textTransform: 'uppercase',
    lineHeight: '24px',
  },
});

const StandardInputLabel = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <InputLabel
      variant="standard"
      className={classes.label}
      {...rest}
    >
      {children}
    </InputLabel>
  );
};

StandardInputLabel.defaultProps = {
  children: null,
};

StandardInputLabel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default StandardInputLabel;
