import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { history } from '../store';
import * as routes from '../constants/routes';
import { withFirebase } from '../core/lib/Firebase';
import { setAuthUser } from './actions';
import {
  Header,
  Landing,
  Admin,
  Listing,
} from '../pages';
import BecomeGuruModal from '../modals/become-guru';
import AuthModal from '../modals/auth';
import UserSubmittedApplicationModal from '../modals/user-submitted-application';

const searchClient = algoliasearch( // TODO: move that in env variables
  'K50KABYMX9',
  'b21248284e21ea5c231e9ed63ea2ce19',
);

const DEBOUNCE_TIME = 700;

const routeStateDefaultValues = {
  page: '1',
  methods: undefined,
  sport: undefined,
  languages: undefined,
  duration: '',
  hitsPerPage: '20',
  q: '',
};

const createURL = (searchState) => {
  const queryParameters = {};
  const routeState = {
    page: String(searchState.page),
    methods: searchState.refinementList && searchState.refinementList['methods.name'],
    sport: searchState.refinementList && searchState.refinementList.sport,
    languages: searchState.refinementList && searchState.refinementList.languages,
    duration:
      searchState.range
      && searchState.range.duration
      && `${searchState.range.duration.min || ''}:${searchState.range.duration.max
      || ''}`,
    hitsPerPage:
      (searchState.hitsPerPage && String(searchState.hitsPerPage)) || undefined,
    q: searchState.q && searchState.q,
  };

  if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
    queryParameters.page = routeState.page;
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
    routeState.hitsPerPage
    && routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
  ) {
    queryParameters.hitsPerPage = routeState.hitsPerPage;
  }

  if (
    routeState.q
    && routeState.q !== routeStateDefaultValues.q
  ) {
    queryParameters.q = routeState.q;
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'comma',
  });

  return `/gurus${queryString}`;
};

const searchStateToUrl = (searchState) => (searchState ? createURL(searchState) : '');

const urlToSearchState = async (location) => {
  const queryParameters = qs.parse(location.search.slice(1));
  const {
    page = 1,
    sport = [],
    methods = [],
    languages = [],
    duration,
    hitsPerPage,
    q = '',
  } = queryParameters;

  const allSports = Array.isArray(sport) ? sport : [sport].filter(Boolean);
  const allMethods = Array.isArray(methods) ? methods : [methods].filter(Boolean);
  const allLanguages = Array.isArray(languages) ? languages : [languages].filter(Boolean);

  const searchState = {
    range: {},
  };

  if (page) {
    searchState.page = page;
  }

  if (allSports.length) {
    searchState.refinementList = {
      sport: allSports.map(decodeURIComponent),
    };
  }

  if (allMethods.length) {
    searchState.refinementList = {
      [methods.name]: allMethods.map(decodeURIComponent),
    };
  }

  if (allLanguages.length) {
    searchState.refinementList = {
      languages: allLanguages.map(decodeURIComponent),
    };
  }

  if (duration) {
    const [min, max = undefined] = duration.split(':');
    searchState.range.duration = {
      min: min || undefined,
      max: max || undefined,
    };
  }

  if (hitsPerPage) {
    searchState.hitsPerPage = hitsPerPage;
  }

  if (q) {
    await geocodeByAddress(q)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        searchState.aroundLatLng = latLng;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return searchState;
};


const App = ({ firebase }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.router.location);
  const auth = useSelector((state) => state.app.auth);
  const isLandingPage = location.pathname === '/';

  const [searchState, setSearchState] = React.useState(urlToSearchState(location));
  const [debouncedSetState, setDebouncedSetState] = React.useState(null);

  useEffect(() => {
    (async () => {
      setSearchState(await urlToSearchState(location));
    })();
  }, [location]);

  useEffect(() => {
    firebase
      .onAuthUserListener((authUser) => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        dispatch(setAuthUser(authUser));
      },
      () => {
        localStorage.removeItem('authUser');
        dispatch(setAuthUser(null));
      });
  }, [auth, dispatch, firebase]);

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
      <CssBaseline />
      <Header />
      <AuthModal />
      <BecomeGuruModal />
      <UserSubmittedApplicationModal />

      <main style={{ paddingTop: isLandingPage ? 0 : 80 }}>
        <Switch>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.ADMIN} component={Admin} />
          <Route path={routes.LISTING} component={Listing} />
        </Switch>
      </main>
    </InstantSearch>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    onAuthUserListener: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(App);
