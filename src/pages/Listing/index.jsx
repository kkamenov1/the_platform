import React from 'react';
import {
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';
import { Configure } from 'react-instantsearch-dom';
import WrapWithHits from './wrap-with-hits';

const Listing = () => (
  <WrapWithHits>
    <Configure aroundLatLngViaIP hitsPerPage={20} minimumAroundRadius={2000} />
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <GeoSearch
        google={window.google}
        maxZoom={11}
        enableRefine
        enableRefineOnMapMove
      >
        {({ hits }) => (
          <div>
            <Control />
            {hits.map((hit) => (
              <Marker key={hit.objectID} hit={hit} />
            ))}
          </div>
        )}
      </GeoSearch>
    </div>
  </WrapWithHits>
);

export default Listing;
