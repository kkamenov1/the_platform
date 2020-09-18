import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '95%',
    maxWidth: 560,
    backgroundColor: '#000',
    margin: '0 auto',
    padding: 36,

    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
  heading: {
    color: '#fafafa',
    letterSpacing: 1.5,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  caption: {
    color: '#fafafa',
    marginBottom: 16,
  },
}));

const ErrorPage = ({
  heading,
  caption,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {heading && (
        <Typography className={classes.heading} variant="h6" component="h6">
          {heading}
        </Typography>
      )}
      {caption && (
        <Typography className={classes.caption}>
          {caption}
        </Typography>
      )}
      {children}
    </div>
  );
};

ErrorPage.defaultProps = {
  heading: '',
  caption: '',
  children: null,
};

ErrorPage.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ErrorPage;
