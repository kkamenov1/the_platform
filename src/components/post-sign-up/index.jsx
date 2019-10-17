import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ExerciseIcon } from '../../svg/exercise.svg';

const useStyles = makeStyles({
  heading: {
    marginBottom: 20,
    fontWeight: 600,
  },

  icon: {
    height: 50,
    marginBottom: 20,
  },

  infoText: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
  },
});

const PostSignUp = () => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        className={classes.heading}
      >
        Thank you for signing up in GYMGURUS!
      </Typography>

      <ExerciseIcon className={classes.icon} />

      <Typography className={classes.infoText} align="center">
        Now please verify your E-Mail: Check you E-Mails (Spam folder
        included) for a confirmation E-Mail. In case you don&apos;t have
        E-Mail. You can resend it again.
      </Typography>
    </>
  );
};

export default PostSignUp;
