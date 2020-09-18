import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NoReviews = ({ guruID }) => (
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to={`/gurus/${guruID}/write-review`}
  >
    WRITE THE FIRST REVIEW
  </Button>
);

NoReviews.propTypes = {
  guruID: PropTypes.string.isRequired,
};

export default NoReviews;
