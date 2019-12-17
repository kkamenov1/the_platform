import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pagingBar: {
    display: 'flex',
    alignItems: 'center',
  },
  current: {
    padding: '10px 20px',
    color: '#6c757d',
  },
});

const SimplePagingBar = ({
  pageNumber,
  maxPage,
  onPageChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.pagingBar}>
      {Number(pageNumber) === 1 ? null : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => onPageChange(pageNumber - 1)}
          id="btn-prev"
        >
          Previous
        </Button>
      )}
      <div className={classes.current}>{`Page: ${pageNumber}`}</div>
      {Number(pageNumber) === Number(maxPage) ? null : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => onPageChange(pageNumber + 1)}
          id="btn-next"
        >
          Next
        </Button>
      )}
    </div>
  )
};

SimplePagingBar.propTypes = {
  classes: PropTypes.shape({
    pagingBar: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
  }).isRequired,
  pageNumber: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default SimplePagingBar;
