import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  arrowWrapper: {
    position: 'absolute',
    top: '50%',
    right: 8,
    transform: 'translate(0, -50%)',
    zIndex: 1,
    display: 'none',
  },
  prevArrow: {
    left: 8,
    right: 'auto',

    '& svg': {
      transform: 'rotate(180deg)',
    },

    '& > button': {
      paddingRight: 2,
      paddingLeft: 0,
    },
  },
  fab: {
    width: 32,
    height: 32,
    minHeight: 0,
    background: theme.palette.common.white,
    paddingLeft: 2,
    trasform: 'scale(1)',
    boxShadow: theme.shadows[3],
    transition: 'all .2s ease-in-out',

    '&:hover': {
      background: theme.palette.common.white,
      transform: 'scale(1.07)',
      boxShadow: theme.shadows[5],
      transition: 'all .2s ease-in-out',
    },

    '& svg': {
      fontSize: 12,
    },
  },
}));

const CarouselArrow = ({ prevArrow, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.arrowWrapper, { [classes.prevArrow]: prevArrow })}>
      <Fab className={classes.fab} disableRipple onClick={onClick}>
        <ArrowForwardIosIcon fontSize="small" />
      </Fab>
    </div>
  );
};

CarouselArrow.defaultProps = {
  prevArrow: false,
};

CarouselArrow.propTypes = {
  prevArrow: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CarouselArrow;
