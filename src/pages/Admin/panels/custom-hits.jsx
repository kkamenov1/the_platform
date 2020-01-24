import React from 'react';
import PropTypes from 'prop-types';
import { connectHits } from 'react-instantsearch-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchHit from './search-hit';

const useStyles = makeStyles({
  container: {
    maxWidth: 1600,
    width: '100%',
    margin: '0 auto',
  },
});

const Hits = ({ hits, handleRejectApplication }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={2}>
      {hits.map((hit) => (
        <Grid item xs={3} key={hit.userID}>
          <SearchHit hit={hit} handleRejectApplication={handleRejectApplication} />
        </Grid>
      ))}
    </Grid>
  );
};

Hits.propTypes = {
  hits: PropTypes.arrayOf({}).isRequired,
};

const CustomHits = connectHits(Hits);

export default CustomHits;
