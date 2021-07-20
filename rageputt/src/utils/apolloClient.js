import { setContext } from 'apollo-link-context'
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws'


let ApolloUri = 'https://rageputt.herokuapp.com/graphql'
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode selected!')
  ApolloUri = 'http://localhost:4000/graphql'
}

const httpLink = new HttpLink({ uri: ApolloUri })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('rageToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const socketLink = new WebSocketLink({
  uri: (process.env.NODE_ENV !== 'production') ? 'ws://localhost:4000/graphql' : 'wss://rageputt.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  socketLink,
  authLink.concat(httpLink)

)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: true,
})

export default client;