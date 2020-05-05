import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
  Divider,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../core/lib/Firebase';
import {
  LabelDivider,
  LinkStyledButton,
  FormError,
  LoadingButton,
} from '../../core/components';
import SignUpLink from '../sign-up-link';
import { FORGOT_PASSWORD } from '../../constants/authModalPages';
import { toggleAuthModal } from '../../modals/auth/actions';
import SocialLoginButtons from '../social-login-buttons';

const useStyles = makeStyles({
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
  bottomDivider: {
    margin: '8px 0 16px 0',
  },
});

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignInForm = ({ firebase, open }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const openForgotPasswordModal = () => {
    dispatch(toggleAuthModal(open, FORGOT_PASSWORD));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;
    setLoading(true);

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInputValues(INITIAL_STATE);
        setError(null);
        setLoading(false);
        dispatch(toggleAuthModal(false));
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
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
      <SocialLoginButtons />
      <div>
        <LabelDivider label="or" />
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

          {error && error.code && error.code.includes('email') && (
            <FormError>{error.message}</FormError>
          )}

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

          {error && error.code
            && (error.code.includes('password') || error.code.includes('user-not-found'))
            && (
              <FormError>{error.message}</FormError>
            )}

          <Typography align="right" component="div">
            <LinkStyledButton
              onClick={() => setShowPassword(!showPassword)}
            >
              Show password
            </LinkStyledButton>
          </Typography>

          <FormControl fullWidth className={classes.formControl}>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={onSubmit}
              size="large"
              label="Log in"
              loading={loading}
            />
          </FormControl>

          <Typography align="center" component="div">
            <LinkStyledButton onClick={openForgotPasswordModal}>
              Forgot Password?
            </LinkStyledButton>
          </Typography>
        </form>

        <Divider className={classes.bottomDivider} />
        <SignUpLink open={open} />
      </div>
    </div>
  );
};

SignInForm.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
};

export default withFirebase(SignInForm);
