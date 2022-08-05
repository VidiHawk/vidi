import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import Config from '../config'

let graphClient:any

const client = {
  getGraphClient: () => {
    if (graphClient) return graphClient
    else {
      graphClient = new ApolloClient({
        ssrMode: true,
        link: new HttpLink({ uri: Config.API_BASE_URL, fetch }),
        cache:
          typeof window == 'undefined' ? new InMemoryCache() : new InMemoryCache().restore(window.__APOLLO_STATE__),
      })
      return graphClient
    }
  },
}

export default client
