import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import * as routes from './constants/routes';


import Header from './pages/Header';
import Landing from './pages/Landing';

const App = () => (

  <Router>
    <div>
      <CssBaseline />
      <Header />

      <Route exact path={routes.LANDING} component={Landing} />
    </div>
  </Router>
);

export default App;
