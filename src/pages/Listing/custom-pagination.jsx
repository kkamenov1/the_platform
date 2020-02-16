import React from 'react';
import PropTypes from 'prop-types';
import { connectPagination } from 'react-instantsearch-dom';
import { animateScroll as scroll } from 'react-scroll';
import { Pagination } from '../../core/components';

const CustomPagination = ({
  currentRefinement, nbPages, refine, createURL,
}) => {
  const handlePageChange = (pageNumber) => {
    refine(pageNumber);
    scroll.scrollToTop({
      duration: 400,
    });
  };

  return (
    <Pagination
      type="full"
      pageNumber={currentRefinement}
      maxPage={nbPages}
      visiblePages={5}
      createURL={createURL}
      onPageChange={handlePageChange}
    />
  );
};

CustomPagination.propTypes = {
  currentRefinement: PropTypes.number.isRequired,
  nbPages: PropTypes.number.isRequired,
  refine: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
};

export default connectPagination(CustomPagination);
