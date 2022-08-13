import { ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

export const cache = new InMemoryCache();

export const createApolloClient = async () => {
  // await before instantiating createApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage)
  });

  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache,
    defaultOptions: { watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }}
  });
};
