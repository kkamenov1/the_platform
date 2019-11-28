import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';

const SPINNER_DIMENSION = 20;

const useStyles = makeStyles((theme) => ({
  btn: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
    transition: ['padding-right'],
    transitionDuration: 300,
  },
  btnLabel: {
    position: 'relative',
    width: 'auto',
  },
  loadingBtn: {
    paddingRight: 45,
    transition: ['padding-right'],
    transitionDuration: 300,
  },
  loaderWrapper: {
    width: SPINNER_DIMENSION,
    height: SPINNER_DIMENSION,
    zIndex: -1,
    opacity: 0,
    position: 'absolute',
    top: '50%',
    right: -30,
    transform: 'translate(0, -50%)',
    transition: ['opacity', 'z-index'],
    transitionDuration: 300,
  },
  loadingSpinner: {
    zIndex: 1,
    opacity: 1,
    transition: ['opacity', 'z-index'],
    transitionDuration: 300,
  },
  loader: {
    color: theme.palette.common.white,
  },
}));

const LoadingButton = ({ label, loading, ...other }) => {
  const classes = useStyles();

  return (
    <Button
      className={classnames(classes.btn, {
        [classes.loadingBtn]: loading,
      })}
      classes={{
        label: classes.btnLabel,
      }}
      {...other}
    >
      {label}
      <div className={classnames(classes.loaderWrapper, {
        [classes.loadingSpinner]: loading,
      })}
      >
        <CircularProgress size={SPINNER_DIMENSION} className={classes.loader} />
      </div>
    </Button>
  );
};

LoadingButton.defaultProps = {
  loading: false,
};

LoadingButton.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default LoadingButton;
