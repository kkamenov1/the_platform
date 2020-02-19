import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
} from '@material-ui/core';
import { connectHits } from 'react-instantsearch-dom';
import Hit from './hit';

const Hits = ({
  hits,
  onHitOver,
  showMap,
}) => (
  <Grid container spacing={!showMap ? 4 : 0}>
    {showMap && <Divider />}
    {hits.map((hit, i) => (
      <Grid key={hit.objectID + i} item xs={showMap ? 12 : 3}>
        <Hit hit={hit} onHitOver={onHitOver} showMap={showMap} />
        {showMap && <Divider />}
      </Grid>
    ))}
  </Grid>
);

Hits.defaultProps = {
  showMap: true,
};

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  showMap: PropTypes.bool,
  onHitOver: PropTypes.func.isRequired,
};

export default connectHits(Hits);
