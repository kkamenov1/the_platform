import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const InfScroll = ({
  pageNumber,
  maxPage,
  onPageChange,
  scrollThresholdToBottom,
}) => {
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - scrollThresholdToBottom
      && pageNumber < maxPage
    ) {
      onPageChange(pageNumber + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });

  return <></>;
};

InfScroll.defaultProps = {
  scrollThresholdToBottom: 400,
};

InfScroll.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  scrollThresholdToBottom: PropTypes.number,
};

export default InfScroll;
