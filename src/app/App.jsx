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

const App = ({ firebase }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase
      .auth
      .onAuthStateChanged((authUser) => (
        authUser
          ? dispatch(setAuthUser(authUser))
          : dispatch(setAuthUser(null))));
  });

  return (
    <Router>
      <div>
        <CssBaseline />
        <Header />

        <Route exact path={routes.LANDING} component={Landing} />
      </div>
    </Router>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.shape({
      onAuthStateChanged: PropTypes.func.isRequired,
    }),
  }).isRequired,
};


export default withFirebase(App);
