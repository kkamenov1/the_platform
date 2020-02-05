import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SearchHit from './search-hit';


const Hits = ({
  hits, handleRejectApplication, handleApproveApplication, toggleModal,
}) => (
  <Grid container spacing={4}>
    {hits.map((hit) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={hit.applicationUID}>
        <SearchHit
          hit={hit}
          handleRejectApplication={handleRejectApplication}
          handleApproveApplication={handleApproveApplication}
          toggleModal={toggleModal}
        />
      </Grid>
    ))}
  </Grid>
);

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    applicationUID: PropTypes.string.isRequired,
    methods: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    birthday: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    introduction: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    certificate: PropTypes.string,
    photoURL: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  handleRejectApplication: PropTypes.func.isRequired,
  handleApproveApplication: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Hits;
