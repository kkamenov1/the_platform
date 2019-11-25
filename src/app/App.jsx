import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import * as routes from '../constants/routes';
import { withFirebase } from '../core/lib/Firebase';
import { setAuthUser } from './actions';

import Header from '../pages/Header';
import Landing from '../pages/Landing';
import BecomeGuruModal from '../modals/become-guru';
import AuthModal from '../modals/auth';

const App = ({ firebase }) => {
  const dispatch = useDispatch();

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
    <Router>
      <div>
        <CssBaseline />
        <Header />
        <AuthModal />
        <BecomeGuruModal />

        <Route exact path={routes.LANDING} component={Landing} />
      </div>
    </Router>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    onAuthUserListener: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(App);
