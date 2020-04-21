import { createConnector } from 'react-instantsearch-dom';

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  getProvidedProps() {
    return {};
  },

  refine(props, searchState, nextValue, newValue) {
    return {
      aroundLatLng: nextValue,
      q: newValue,
      boundingBox: {},
      page: 1,
      range: {},
    };
  },

  getSearchParameters(searchParameters, props, searchState) {
    const currentRefinement = searchState.aroundLatLng || props.defaultRefinement;
    return searchParameters
      .setQueryParameter('insideBoundingBox')
      .setQueryParameter(
        'aroundLatLng',
        `${Number(currentRefinement.lat)}, ${Number(currentRefinement.lng)}`,
      );
  },
});
