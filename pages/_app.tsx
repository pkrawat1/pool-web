import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { createApolloClient } from "@/lib/";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const init = async () => setClient(await createApolloClient());
    init().catch(console.error);
  }, []);

  return (
    client && (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  );
};

export default MyApp;
