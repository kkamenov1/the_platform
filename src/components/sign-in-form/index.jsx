import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  CircularProgressInButton,
  FormError,
  SimpleButton,
} from '../../core/components';
import SignUpLink from '../sign-up-link';
import { FORGOT_PASSWORD_BTN_NAME } from '../../constants/routes';
import {
  toggleHeaderModal,
  setLoadingSignInModal,
} from '../../pages/Header/actions';
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

const SignInForm = ({ firebase }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.header.signInModal.loading);
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const openForgotPasswordModal = () => {
    dispatch(toggleHeaderModal(true, FORGOT_PASSWORD_BTN_NAME));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;
    dispatch(setLoadingSignInModal(true));

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInputValues(INITIAL_STATE);
        setError(null);
        dispatch(setLoadingSignInModal(false));
        dispatch(toggleHeaderModal(false, ''));
      })
      .catch((err) => {
        setError(err);
        dispatch(setLoadingSignInModal(false));
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
            <SimpleButton
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Log in
              <CircularProgressInButton loading={loading} />
            </SimpleButton>
          </FormControl>

          <Typography align="center" component="div">
            <LinkStyledButton onClick={openForgotPasswordModal}>
              {FORGOT_PASSWORD_BTN_NAME}
            </LinkStyledButton>
          </Typography>
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
