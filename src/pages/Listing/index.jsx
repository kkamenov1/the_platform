import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GeoSearch, Control } from 'react-instantsearch-dom-maps';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import qs from 'qs';
import { history } from '../../store';
import WrapWithHits from './wrap-with-hits';
import CustomMapMarker from './custom-map-marker';
import {
  MAP_ZOOM_LEVEL,
  DEBOUNCE_TIME,
  HITS_PER_PAGE_LISTING,
} from '../../core/config';
import { getCategorySlug, getCategoryName } from '../../core/utils';


const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_APP_SECRET,
);

const routeStateDefaultValues = {
  q: '',
  page: '1',
  methods: undefined,
  priceFrom: '',
  sport: undefined,
  languages: undefined,
  duration: '',
  rating: undefined,
  hitsPerPage: '10',
  boundingBox: {},
};

const urlToSearchState = async (location) => {
  const queryParameters = qs.parse(
    decodeURIComponent(location.search.slice(1)), {
      comma: true,
    },
  );
  const {
    q = '',
    page = 1,
    sport = [],
    methods = [],
    languages = [],
    duration,
    priceFrom,
    rating = [],
    hitsPerPage,
    boundingBox = {},
  } = queryParameters;
  const allSports = Array.isArray(sport) ? sport : [sport].filter(Boolean);
  const allMethods = Array.isArray(methods) ? methods : [methods].filter(Boolean);
  const allLanguages = Array.isArray(languages) ? languages : [languages].filter(Boolean);
  const allRatings = Array.isArray(rating) ? rating : [rating].filter(Boolean);

  const searchState = {
    range: {},
  };

  if (page) {
    searchState.page = page;
  }

  if (allSports.length) {
    searchState.refinementList = {
      sport: allSports,
    };
  }

  if (allMethods.length) {
    searchState.refinementList = {
      [methods.name]: allMethods,
    };
  }

  if (allLanguages.length) {
    searchState.refinementList = {
      languages: allLanguages,
    };
  }

  if (allRatings.length) {
    searchState.refinementList = {
      rating: allRatings,
    };
  }

  if (priceFrom) {
    const { min, max } = priceFrom;
    searchState.range.priceFrom = {
      min: min || undefined,
      max: max || undefined,
    };
  }

  if (duration) {
    const { min, max } = duration;
    searchState.range.duration = {
      min: min || undefined,
      max: max || undefined,
    };
  }

  if (hitsPerPage) {
    searchState.hitsPerPage = hitsPerPage;
  }

  if (Object.keys(boundingBox).length) {
    searchState.boundingBox = {
      northEast: {
        lat: Number(boundingBox.northEast.lat),
        lng: Number(boundingBox.northEast.lng),
      },
      southWest: {
        lat: Number(boundingBox.southWest.lat),
        lng: Number(boundingBox.southWest.lng),
      },
    };
  }

  if (q) {
    const parsedQuery = getCategoryName(q);
    await geocodeByAddress(decodeURIComponent(parsedQuery))
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        searchState.aroundLatLng = latLng;
        searchState.q = parsedQuery;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return searchState;
};

const Listing = ({ location }) => {
  const [selectedHit, setSelectedHit] = React.useState(null);
  const [debouncedSetState, setDebouncedSetState] = React.useState(null);
  const [searchState, setSearchState] = React.useState({});

  useEffect(() => {
    (async () => {
      const newSearchState = await urlToSearchState(location);
      setSearchState(newSearchState);
    })();
  }, [location]);

  const onHitOver = (hit) => {
    setSelectedHit(hit);
  };

  const createURL = (state) => {
    const queryParameters = {};
    const routeState = {
      page: String(state.page),
      sport: state.refinementList && state.refinementList.sport,
      languages: state.refinementList && state.refinementList.languages,
      priceFrom: state.range && state.range.priceFrom,
      methods: state.refinementList && state.refinementList['methods.name'],
      duration: state.range && state.range.duration,
      hitsPerPage:
        (state.hitsPerPage && String(state.hitsPerPage)) || undefined,
      boundingBox: state.boundingBox && state.boundingBox,
      q: state.q && state.q,
      rating: state.refinementList && state.refinementList.rating,
    };

    if (
      routeState.q
      && routeState.q !== routeStateDefaultValues.q
    ) {
      queryParameters.q = getCategorySlug(routeState.q);
    }

    if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
    }

    if (routeState.priceFrom && routeState.priceFrom !== routeStateDefaultValues.priceFrom) {
      queryParameters.priceFrom = routeState.priceFrom;
    }

    if (
      routeState.methods
      && routeState.methods !== routeStateDefaultValues.methods
    ) {
      queryParameters.methods = routeState.methods.map(encodeURIComponent);
    }

    if (
      routeState.sport
      && routeState.sport !== routeStateDefaultValues.sport
    ) {
      queryParameters.sport = routeState.sport.map(encodeURIComponent);
    }

    if (
      routeState.languages
      && routeState.languages !== routeStateDefaultValues.languages
    ) {
      queryParameters.languages = routeState.languages.map(encodeURIComponent);
    }

    if (routeState.duration && routeState.duration !== routeStateDefaultValues.duration) {
      queryParameters.duration = routeState.duration;
    }

    if (
      routeState.rating
      && routeState.rating !== routeStateDefaultValues.rating
    ) {
      queryParameters.rating = routeState.rating.map(encodeURIComponent);
    }

    if (
      routeState.hitsPerPage
      && routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
    ) {
      queryParameters.hitsPerPage = routeState.hitsPerPage;
    }

    if (
      routeState.boundingBox
      && routeState.boundingBox !== routeStateDefaultValues.boundingBox
    ) {
      queryParameters.boundingBox = routeState.boundingBox;
    }

    const queryString = qs.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'comma',
    });

    return `/gurus${queryString}`;
  };

  const searchStateToUrl = (updatedSearchState) => (updatedSearchState ? createURL(updatedSearchState) : '');

  const onSearchStateChange = (updatedSearchState) => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.push(searchStateToUrl(updatedSearchState), updatedSearchState);
      }, DEBOUNCE_TIME),
    );

    setSearchState(updatedSearchState);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="users"
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
    >
      <WrapWithHits selectedHit={selectedHit} onHitOver={onHitOver}>
        <Configure hitsPerPage={HITS_PER_PAGE_LISTING} aroundRadius={5000} />

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
    </InstantSearch>
  );
};

Listing.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
};

export default Listing;
