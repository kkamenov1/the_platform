import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleHeaderModal } from '../../pages/Header/actions';
import { SIGNUP_BTN_NAME } from '../../constants/routes';
import { LinkStyledButton } from '../../core/components';

const useStyles = makeStyles({
  text: {
    verticalAlign: 'middle',
    color: 'rgb(72, 72, 72)',
  },
  signupText: {
    fontWeight: 800,
  },
});

const SignUpLink = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggleHeaderModal(true, SIGNUP_BTN_NAME));
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
