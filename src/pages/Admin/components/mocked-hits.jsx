import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import MockedCard from './mocked-card';


const MockedHits = ({ pageSize }) => (
  <Grid container spacing={4}>
    {[...Array(pageSize).keys()].map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
        <MockedCard />
      </Grid>
    ))}
  </Grid>
);

MockedHits.propTypes = {
  pageSize: PropTypes.number.isRequired,
};

export default MockedHits;
