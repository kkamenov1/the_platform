import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Divider,
  InputAdornment,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../core/lib/Firebase';
import OrDivider from '../../core/components/or-divider';
import LinkStyledButton from '../../core/components/link-styled-button';
import SignUpLink from '../sign-up-link';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px 0',

    '&:first-child': {
      margin: '0 0 8px 0',
    },
  },
  input: {
    '& input': {
      padding: '13.5px 14px',
    },
  },
  submitBtn: {
    backgroundColor: 'rgb(255, 90, 95)',
    padding: '9px 8px',
    textTransform: 'none',
    fontSize: 16,
    color: theme.palette.common.white,

    '&:hover': {
      backgroundColor: 'rgb(255, 90, 95)',
    },
  },
  showPasswordWrapper: {
    textAlign: 'right',
  },
  forgotPasswordWrapper: {
    textAlign: 'center',
  },
  bottomDivider: {
    margin: '8px 0 16px 0',
  },
}));

const socialBtnStyles = {
  margin: '8px 0',
  width: '100%',
  height: 46,
};

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignInForm = ({ firebase }) => {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState('password');

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInputValues(INITIAL_STATE);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const onChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <FacebookLoginButton
          onClick={() => alert('Hello')}
          style={socialBtnStyles}
          align="center"
          preventActiveStyles
        >
          <Typography>Log in with Facebook</Typography>
        </FacebookLoginButton>
        <GoogleLoginButton
          onClick={() => alert('Hello')}
          style={socialBtnStyles}
          align="center"
          preventActiveStyles
        >
          <Typography>Log in with Google</Typography>
        </GoogleLoginButton>
      </div>
      <div>
        <OrDivider />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant="outlined"
              name="password"
              value={inputValues.password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <div className={classes.showPasswordWrapper}>
            <LinkStyledButton
              onClick={() => setShowPassword(!showPassword)}
            >
              Show password
            </LinkStyledButton>
          </div>

          {error && <Typography color="error">{error.message}</Typography>}

          <FormControl fullWidth className={classes.formControl}>
            <Button
              variant="contained"
              className={classes.submitBtn}
              onClick={onSubmit}
            >
              Log in
            </Button>
          </FormControl>

          <div className={classes.forgotPasswordWrapper}>
            <LinkStyledButton onClick={() => alert('hellooo')}>
              Forgot password?
            </LinkStyledButton>
          </div>
        </form>

        <Divider className={classes.bottomDivider} />
        <SignUpLink />
      </div>
    </div>
  );
};

SignInForm.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignInForm);
