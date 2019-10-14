import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { withFirebase } from '../../core/lib/Firebase';
import { toggleHeaderModal } from '../../pages/Header/actions';

const socialBtnStyles = {
  margin: '8px 0',
  width: '100%',
  height: 46,
};

const useStyles = makeStyles({
  error: {
    fontSize: 14,
  },
});

const SocialLoginButtons = ({ firebase }) => {
  const classes = useStyles();
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
            isGuru: false,
            isAdmin: false,
          })))
      .then(() => {
        setErrorGoogle(null);
        dispatch(toggleHeaderModal(false, ''));
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
            isGuru: false,
            isAdmin: false,
          })))
      .then(() => {
        setErrorFB(null);
        dispatch(toggleHeaderModal(false, ''));
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
      {errorFB && (
        <Typography
          color="error"
          className={classes.error}
        >
          {errorFB.message}
        </Typography>
      )}

      <GoogleLoginButton
        onClick={onGoogleBtnClick}
        style={socialBtnStyles}
        align="center"
        preventActiveStyles
      >
        <Typography>Log in with Google</Typography>
      </GoogleLoginButton>
      {errorGoogle && (
        <Typography
          color="error"
          className={classes.error}
        >
          {errorGoogle.message}
        </Typography>
      )}
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
