import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import Firebase, { FirebaseContext } from './core/lib/Firebase';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <FirebaseContext.Provider value={new Firebase()}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </FirebaseContext.Provider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
