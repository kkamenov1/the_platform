import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    marginTop: 0,
    width: '100%',
  },
});

const InputWithLabel = ({
  id,
  placeholder,
  label,
  other,
}) => {
  const classes = useStyles();

  return (
    <div>
      <InputLabel htmlFor={id}>
        <Typography variant="button">{label}</Typography>
      </InputLabel>
      <TextField
        id={id}
        variant="outlined"
        placeholder={placeholder}
        margin="dense"
        className={classes.input}
        {...other}
      />
    </div>
  );
};

InputWithLabel.defaultProps = {
  other: {},
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  other: PropTypes.shape({}),
};

export default InputWithLabel;
