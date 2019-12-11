import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Pagination = ({ onLoadMore }) => (
  <Button
    variant="contained"
    size="large"
    color="primary"
    aria-label="next"
    onClick={onLoadMore}
  >
    Load More
  </Button>
);

Pagination.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Pagination;
