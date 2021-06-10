import React from 'react';
import ReactDOM from 'react-dom'
import { setContext } from 'apollo-link-context'

import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

import store from './store'

const authLink = setContext(( _, { headers }) => {
  const token = localStorage.getItem('rageToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})
let ApolloUri = 'https://rageputt.herokuapp.com/graphql'
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode selected!')
  ApolloUri = 'http://localhost:4000/graphql'
}
const httpLink = new HttpLink( { uri: ApolloUri })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

