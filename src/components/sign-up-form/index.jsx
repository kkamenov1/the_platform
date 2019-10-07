import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../core/lib/Firebase';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px 0',
  },
  input: {
    '& input': {
      padding: '13.5px 14px',
    },
  },
  submitBtn: {
    backgroundColor: 'rgb(255, 90, 95)',
    padding: '10px 8px',
    textTransform: 'none',
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 800,

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
}));

const SignUpLink = () => <Button>Sign Up</Button>;

const INITIAL_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  passwordOne: '',
  passwordTwo: '',
};

const SignUpForm = ({ firebase }) => {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const isInvalid = inputValues.passwordOne !== inputValues.passwordTwo
    || inputValues.passwordOne === ''
    || inputValues.email === ''
    || inputValues.username === '';

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = inputValues;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        setInputValues(INITIAL_STATE);
      })
      .catch((err) => {
        setError({ err });
      });
  };

  const onChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          variant="outlined"
          name="email"
          value={inputValues.email}
          onChange={onChange}
          type="email"
          placeholder="Email address"
          className={classes.input}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <TextField
          variant="outlined"
          name="firstName"
          value={inputValues.firstName}
          onChange={onChange}
          type="text"
          placeholder="First name"
          className={classes.input}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <TextField
          variant="outlined"
          name="lastName"
          value={inputValues.lastName}
          onChange={onChange}
          type="text"
          placeholder="Last name"
          className={classes.input}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <TextField
          variant="outlined"
          name="passwordOne"
          value={inputValues.passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Create a Password"
          className={classes.input}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <TextField
          variant="outlined"
          name="passwordTwo"
          value={inputValues.passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm password"
          className={classes.input}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <Button
          variant="contained"
          className={classes.submitBtn}
          disabled={isInvalid}
          onClick={onSubmit}
        >
          Sign up
        </Button>
      </FormControl>

      {error && <p>{error.message}</p>}
    </form>
  );
};

SignUpForm.propTypes = {
  firebase: PropTypes.shape({
    doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export { SignUpLink };
export default withFirebase(SignUpForm);
