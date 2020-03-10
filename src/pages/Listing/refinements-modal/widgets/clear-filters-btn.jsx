import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { toggleRefinementsModal } from '../../actions';

const ClearFiltersBtn = ({ items, refine }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    refine(items);
    dispatch(toggleRefinementsModal(false));
  };

  return (
    <Button color="primary" onClick={handleClick}>
      Reset filters
    </Button>
  );
};

ClearFiltersBtn.propTypes = {
  items: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectCurrentRefinements(ClearFiltersBtn);
