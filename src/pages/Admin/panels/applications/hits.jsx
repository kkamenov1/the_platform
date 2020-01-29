import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SearchHit from './search-hit';


const Hits = ({ hits, handleRejectApplication }) => (
  <Grid container spacing={4}>
    {hits.map((hit) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={hit.userID}>
        <SearchHit
          hit={hit}
          handleRejectApplication={handleRejectApplication}
        />
      </Grid>
    ))}
  </Grid>
);

Hits.propTypes = {
  hits: PropTypes.arrayOf({}).isRequired,
  handleRejectApplication: PropTypes.func.isRequired,
};

export default Hits;
