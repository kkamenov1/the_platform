import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SimplePagingBar from './simple-paging-bar';
import FullPagingBar from './full-paging-bar';
import InfScroll from './inf-scroll';

const Pagination = (props) => {
  const {
    type,
    pageNumber,
    maxPage,
    onPageChange,
    visiblePages,
    separator,
    scrollThresholdToBottom,
  } = props;
  if (type === 'full') {
    return (
      <FullPagingBar
        pageNumber={pageNumber}
        maxPage={maxPage}
        onPageChange={onPageChange}
        visiblePages={visiblePages}
        separator={separator}
      />
    );
  }

  if (type === 'loadmore') {
    if (pageNumber <= maxPage) {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={() => pageNumber + 1}
        >
          Load More
        </Button>
      );
    }
    return null;
  }

  if (type === 'infscroll') {
    return (
      <InfScroll
        pageNumber={pageNumber}
        maxPage={maxPage}
        onPageChange={onPageChange}
        scrollThresholdToBottom={scrollThresholdToBottom}
      />
    );
  }

  return (
    <SimplePagingBar
      pageNumber={pageNumber}
      maxPage={maxPage}
      onPageChange={onPageChange}
    />
  );
};

Pagination.defaultProps = {
  visiblePages: 5,
  separator: '...',
  scrollThresholdToBottom: 400,
  type: 'simple',
};

Pagination.propTypes = {
  type: PropTypes.oneOf(['full', 'loadmore', 'infscroll', 'simple']),
  pageNumber: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  visiblePages: PropTypes.number,
  separator: PropTypes.string,
  scrollThresholdToBottom: PropTypes.number,
};

export default Pagination;
