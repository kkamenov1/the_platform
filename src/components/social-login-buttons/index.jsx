import React from 'react';
import { Typography } from '@material-ui/core';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const socialBtnStyles = {
  margin: '8px 0',
  width: '100%',
  height: 46,
};


const SocialLoginButtons = () => (
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
);

export default SocialLoginButtons;
