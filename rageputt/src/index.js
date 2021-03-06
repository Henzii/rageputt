import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-ui/styles';

import client from './utils/apolloClient';
import store from './utils/store'

import theme from './utils/theme';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

