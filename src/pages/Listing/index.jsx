import React from 'react';
import {
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';
import { Configure } from 'react-instantsearch-dom';
import WrapWithHits from './wrap-with-hits';

const zoom = 12;

const Listing = () => (
  <WrapWithHits>
    <Configure hitsPerPage={20} aroundRadius={5000} />

    <div style={{ height: 'calc(100vh - 160px)' }}>
      <GeoSearch
        google={window.google}
        initialZoom={zoom}
        maxZoom={zoom}
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
