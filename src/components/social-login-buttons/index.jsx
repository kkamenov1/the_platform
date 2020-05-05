import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { withFirebase } from '../../core/lib/Firebase';
import { toggleAuthModal } from '../../modals/auth/actions';
import { FormError } from '../../core/components';

const socialBtnStyles = {
  margin: '8px 0',
  width: '100%',
  height: 46,
};

const SocialLoginButtons = ({ firebase }) => {
  const [errorGoogle, setErrorGoogle] = useState(null);
  const [errorFB, setErrorFB] = useState(null);
  const dispatch = useDispatch();

  const onGoogleBtnClick = () => {
    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => (
        firebase
          .user(socialAuthUser.user.uid)
          .set({
            email: socialAuthUser.user.email,
            displayName: socialAuthUser.user.displayName,
            photoURL: socialAuthUser.user.photoURL,
          }, { merge: true })))
      .then(() => {
        setErrorGoogle(null);
        dispatch(toggleAuthModal(false));
      })
      .catch((err) => {
        setErrorGoogle(err);
      });
  };

  const onFacebookBtnClick = () => {
    firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => (
        firebase
          .user(socialAuthUser.user.uid)
          .set({
            email: socialAuthUser.additionalUserInfo.profile.email,
            displayName: socialAuthUser.additionalUserInfo.profile.name,
            photoURL: socialAuthUser.user.photoURL,
          }, { merge: true })))
      .then(() => {
        setErrorFB(null);
        dispatch(toggleAuthModal(false));
      })
      .catch((err) => {
        setErrorFB(err);
      });
  };

  return (
    <div>
      <FacebookLoginButton
        onClick={onFacebookBtnClick}
        style={socialBtnStyles}
        align="center"
        preventActiveStyles
      >
        <Typography>Log in with Facebook</Typography>
      </FacebookLoginButton>
      {errorFB && <FormError>{errorFB.message}</FormError>}

      <GoogleLoginButton
        onClick={onGoogleBtnClick}
        style={socialBtnStyles}
        align="center"
        preventActiveStyles
      >
        <Typography>Log in with Google</Typography>
      </GoogleLoginButton>
      {errorGoogle && <FormError>{errorGoogle.message}</FormError>}
    </div>
  );
};

SocialLoginButtons.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithGoogle: PropTypes.func.isRequired,
    doSignInWithFacebook: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SocialLoginButtons);
