import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as NavigationLink } from 'react-router-dom';

const useStyles = makeStyles({
  consent: {
    color: '#bbb',
    fontSize: 10,
    marginTop: 24,
  },
});

const Consent = () => {
  const classes = useStyles();

  return (
    <Typography
      component="p"
      variant="caption"
      className={classes.consent}
      gutterBottom
    >
      By clicking &quot;Apply Now&quot;,
      you agree to the ProGuides
      {' '}
      <Link
        underline="none"
        component={NavigationLink}
        to="/terms-and-conditions"
      >
        Terms of Service
      </Link>
      {' '}
      and
      {' '}
      <Link
        underline="none"
        component={NavigationLink}
        to="/privacy-policy"
      >
        Privacy Policy
      </Link>
      .
    </Typography>
  );
};

export default Consent;
