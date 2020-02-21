import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';
import {
  InstantSearch,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
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

const App = ({ firebase }) => {
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.router.location.pathname);
  const isLandingPage = pathname === '/';

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
  });

  return (
    <ConnectedRouter history={history}>
      <InstantSearch searchClient={searchClient} indexName="users">
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
    </ConnectedRouter>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    onAuthUserListener: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(App);
