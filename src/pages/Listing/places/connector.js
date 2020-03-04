import { createConnector } from 'react-instantsearch-dom';

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  getProvidedProps() {
    return {};
  },

  refine(props, searchState, nextValue, newValue) {
    return {
      ...searchState,
      aroundLatLng: nextValue,
      q: newValue,
      boundingBox: {},
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
