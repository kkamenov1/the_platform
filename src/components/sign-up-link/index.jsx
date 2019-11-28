import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleAuthModal } from '../../modals/auth/actions';
import { SIGN_UP } from '../../constants/authModalPages';
import { LinkStyledButton } from '../../core/components';

const useStyles = makeStyles((theme) => ({
  text: {
    verticalAlign: 'middle',
    color: theme.palette.text.primary,
  },
  signupText: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const SignUpLink = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggleAuthModal(true, SIGN_UP));
  };

  return (
    <div>
      <Typography component="span" className={classes.text}>
        Don&apos;t have an account?
      </Typography>
      <LinkStyledButton onClick={onClick}>
        <Typography
          component="span"
          className={classes.signupText}
        >
          Sign up
        </Typography>
      </LinkStyledButton>
    </div>
  );
};

export default SignUpLink;
