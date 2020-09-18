import React from 'react';
import PropTypes from 'prop-types';

import SignInForm from '../sign-in-form';
import SignUpForm from '../sign-up-form';
import ForgotPasswordForm from '../forgot-password-form';
import {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
} from '../../../constants/authModalPages';

const AuthContent = ({ page, open = false }) => {
  switch (page) {
    case SIGN_IN:
      return <SignInForm open={open} />;
    case SIGN_UP:
      return <SignUpForm open={open} />;
    case FORGOT_PASSWORD:
      return <ForgotPasswordForm open={open} />;
    default:
      return <></>;
  }
};

AuthContent.defaultProps = {
  open: false,
};

AuthContent.propTypes = {
  page: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export default AuthContent;
