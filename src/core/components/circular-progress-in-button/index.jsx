import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const PROGRESS_MARGIN = 5;
const PROGRESS_DIMENSIONS = 18;

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    width: PROGRESS_DIMENSIONS + PROGRESS_MARGIN,
    height: PROGRESS_DIMENSIONS + PROGRESS_MARGIN,
  },
  progress: {
    color: theme.palette.common.white,
    marginLeft: PROGRESS_MARGIN,
  },
}));

const CircularProgressInButton = ({ loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.progressWrapper}>
      {loading && (
        <CircularProgress className={classes.progress} size={PROGRESS_DIMENSIONS} />
      )}
    </div>
  );
};

CircularProgressInButton.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default CircularProgressInButton;
