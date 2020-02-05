import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles({
  arrowWrapper: {
    position: 'absolute',
    top: '50%',
    right: 20,
    transition: 'right .3s',
    transform: 'translate(0, -50%)',
    zIndex: 1,

    '&:hover': {
      right: 10,
      transition: 'right .3s',
    },
  },
  prevArrow: {
    left: 20,
    transition: 'left .3s',
    right: 'auto',

    '&:hover': {
      right: 'auto',
      left: 10,
      transition: 'left .3s',
    },

    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
  fab: {
    background: 'transparent',
    boxShadow: 'none',

    '&:hover': {
      background: 'transparent',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },
});

const CarouselArrow = ({ prevArrow, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.arrowWrapper, { [classes.prevArrow]: prevArrow })}>
      <Fab className={classes.fab} disableRipple onClick={onClick}>
        <TrendingFlatIcon fontSize="large" />
      </Fab>
    </div>
  );
};

CarouselArrow.defaultProps = {
  prevArrow: false,
};

CarouselArrow.propTypes = {
  prevArrow: PropTypes.bool,
};

export default CarouselArrow;
