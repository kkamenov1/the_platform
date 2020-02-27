import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearFiltersBtn = ({ items, refine }) => {
  const handleClick = () => {
    refine(items);
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
