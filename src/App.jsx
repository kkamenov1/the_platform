import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as routes from './constants/routes'

import { CssBaseline } from '@material-ui/core'

import Navigation from './components/Navigation'
import Landing from './pages/Landing'

const App = () => (
  <Router>
    <div style={{ backgroundColor: 'red' }}>
      <CssBaseline />
      <Navigation />

      <Route exact path={routes.LANDING} component={Landing} />
    </div>
  </Router>
)

export default App
