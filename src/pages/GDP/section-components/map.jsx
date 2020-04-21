import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { MAP_ZOOM_LEVEL, GDP_MAP_OPTIONS } from '../../../core/config';

const Map = ({ location }) => (
  <GoogleMap
    defaultZoom={MAP_ZOOM_LEVEL}
    defaultCenter={location}
    options={GDP_MAP_OPTIONS}
  >
    <Marker position={location} />
  </GoogleMap>
);

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

export default withGoogleMap(Map);
