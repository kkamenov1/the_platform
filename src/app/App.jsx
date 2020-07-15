import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import * as routes from '../constants/routes';
import { withFirebase } from '../core/lib/Firebase';
import { setAuthUser } from './actions';
import {
  Header,
  Landing,
  Admin,
  Listing,
  GDP,
  BecomeGuru,
  Application,
  WriteReview,
} from '../pages';
import AuthModal from '../modals/auth';

const App = ({ firebase }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.router.location);
  const isLandingPage = location.pathname === '/';

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
  }, [dispatch, firebase]);

  return (
    <>
      <CssBaseline />
      <Header />
      <AuthModal />

      <main style={{ paddingTop: isLandingPage ? 0 : 80 }}>
        <Switch>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.ADMIN} component={Admin} />
          <Route exact path={routes.LISTING} component={Listing} />
          <Route exact path={routes.GDP} component={GDP} />
          <Route path={routes.WRITE_REVIEW} component={WriteReview} />
          <Route exact path={routes.BECOME_GURU} component={BecomeGuru} />
          <Route path={routes.BECOME_GURU_APPLY} component={Application} />
        </Switch>
      </main>
    </>
  );
};

App.propTypes = {
  firebase: PropTypes.shape({
    onAuthUserListener: PropTypes.func.isRequired,
  }).isRequired,
};


export default withFirebase(App);
