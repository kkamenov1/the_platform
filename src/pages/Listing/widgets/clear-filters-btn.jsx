import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { toggleRefinementsModal } from '../actions';

const useStyles = makeStyles({
  icon: {
    fontSize: 18,
    marginRight: 5,
  },
});

const ClearFiltersBtn = ({ items, refine, ...btnProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = () => {
    refine(items);
    dispatch(toggleRefinementsModal(false));
  };

  return (
    <Button onClick={handleClick} {...btnProps}>
      <RotateLeftIcon className={classes.icon} />
      Clear filters
    </Button>
  );
};

ClearFiltersBtn.propTypes = {
  items: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectCurrentRefinements(ClearFiltersBtn);
