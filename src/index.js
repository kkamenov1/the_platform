import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './store'
import Firebase, { FirebaseContext } from './core/lib/Firebase'

ReactDOM.render(
  <Provider store={configureStore()}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
