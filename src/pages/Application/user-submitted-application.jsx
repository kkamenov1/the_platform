import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as EmailIcon } from '../../svg/mail.svg';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 50,
    height: 'calc(100vh - 80px)',
  },
  heading: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightMedium,
  },

  infoText: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 20,
  },

  icon: {
    height: 75,
    width: 'auto',
    marginBottom: 20,
  },
}));

const UserSubmittedApplication = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.wrapper}>
      <Grid item>
        <Typography
          variant="h5"
          component="h5"
          align="center"
          className={classes.heading}
        >
          Thank you for trying to apply to our gurus platform. Unfortunately,
          there is already a pending application for that user.
        </Typography>

        <Typography component="div" align="center">
          <EmailIcon className={classes.icon} />
        </Typography>

        <Typography className={classes.infoText} align="center">
          Please be patient.
          You will receive an email with the assessment of the application.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserSubmittedApplication;
