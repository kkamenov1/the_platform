import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { connectHits } from 'react-instantsearch-dom';
import Hit from './hit';

const Hits = ({
  hits,
  onHitOver,
  showMap,
}) => (
  <>
    {hits && hits.length ? (
      <Grid container spacing={!showMap ? 4 : 0}>
        {showMap && <Divider />}
        {hits.map((hit, i) => (
          <Grid key={hit.objectID + i} item xs={showMap ? 12 : 3}>
            <Hit hit={hit} onHitOver={onHitOver} showMap={showMap} />
            {showMap && <Divider />}
          </Grid>
        ))}
      </Grid>
    ) : (
      <>
        <Typography variant="h6" component="h6" paragraph>
          No results found
        </Typography>
        <Typography variant="body2" component="p" paragraph>
          No gurus found for that location. Maybe you can search for other location.
        </Typography>
        <Divider />
      </>
    )}
  </>
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
