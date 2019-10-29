import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  LOGIN_BTN_NAME,
  SIGNUP_BTN_NAME,
  FORGOT_PASSWORD_BTN_NAME,
  POST_SIGNUP,
  BECOMEAGURU_BTN_NAME,
} from '../../constants/routes';

import SignUpForm from '../sign-up-form';
import SignInForm from '../sign-in-form';
import ForgotPasswordForm from '../forgot-password-form';
import PostSignUp from '../post-sign-up';
import BecomeAGuru from '../become-a-guru';

const useStyles = makeStyles({
  headerModalHeading: {
    fontWeight: 600,
    textAlign: 'left',
    marginBottom: 16,
    color: 'rgb(72, 72, 72)',
  },
  infoText: {
    marginBottom: 20,
  },
});

const ModalHeaderProvider = ({ headerModalName }) => {
  const classes = useStyles();

  if (headerModalName === LOGIN_BTN_NAME) {
    return <SignInForm />;
  }

  if (headerModalName === SIGNUP_BTN_NAME) {
    return <SignUpForm />;
  }

  if (headerModalName === POST_SIGNUP) {
    return <PostSignUp />;
  }

  if (headerModalName === FORGOT_PASSWORD_BTN_NAME) {
    return (
      <>
        <Typography
          variant="h5"
          component="h5"
          className={classes.headerModalHeading}
        >
          Reset password
        </Typography>
        <Typography className={classes.infoText}>
          Enter the email address associated with your account,
          and we’ll email you a link to reset your password.
        </Typography>
        <ForgotPasswordForm />
      </>
    );
  }

  if (headerModalName === BECOMEAGURU_BTN_NAME) {
    return <BecomeAGuru />;
  }

  return (
    <CircularProgress />
  );
};

ModalHeaderProvider.propTypes = {
  headerModalName: PropTypes.string.isRequired,
};

export default ModalHeaderProvider;
