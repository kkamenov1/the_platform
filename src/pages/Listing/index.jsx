import React from 'react';
import { GeoSearch, Control } from 'react-instantsearch-dom-maps';
import { Configure } from 'react-instantsearch-dom';
import WrapWithHits from './wrap-with-hits';
import CustomMapMarker from './custom-map-marker';
import { MAP_ZOOM_LEVEL } from '../../core/config';

const Listing = () => {
  const [selectedHit, setSelectedHit] = React.useState(null);

  const onHitOver = (hit) => {
    setSelectedHit(hit);
  };

  return (
    <WrapWithHits selectedHit={selectedHit} onHitOver={onHitOver}>
      <Configure hitsPerPage={20} aroundRadius={5000} />

      <div style={{ height: 'calc(100vh - 160px)' }}>
        <GeoSearch
          google={window.google}
          initialZoom={MAP_ZOOM_LEVEL}
          maxZoom={MAP_ZOOM_LEVEL}
        >
          {({ hits }) => (
            <div>
              <Control />
              {hits.map((hit) => (
                <CustomMapMarker
                  key={hit.objectID}
                  hit={hit}
                  onHitOver={onHitOver}
                  selectedHit={selectedHit}
                />
              ))}
            </div>
          )}
        </GeoSearch>
      </div>
    </WrapWithHits>
  );
};

export default Listing;
