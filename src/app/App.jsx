import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';
import { history } from '../store';
import * as routes from '../constants/routes';
import { withFirebase } from '../core/lib/Firebase';
import { setAuthUser } from './actions';

import {
  Header,
  Landing,
  Admin,
} from '../pages';
import BecomeGuruModal from '../modals/become-guru';
import AuthModal from '../modals/auth';
import UserSubmittedApplicationModal from '../modals/user-submitted-application';

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
      <CssBaseline />
      <Header isLandingPage={isLandingPage} />
      <AuthModal />
      <BecomeGuruModal />
      <UserSubmittedApplicationModal />

      <main style={{ paddingTop: isLandingPage ? 0 : 80 }}>
        <Switch>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.ADMIN} component={Admin} />
        </Switch>
      </main>
    </ConnectedRouter>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    onAuthUserListener: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(App);
