import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { Layout } from "../server/routes/layout";
import { Auth } from "../server/routes/auth";
import React from "react";
import { hydrate } from "react-dom";

export const App = () => {
  const state = ('__APOLLO_STATE__' in window) ? ((window['__APOLLO_STATE__'] as unknown) as any): {};
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    credentials: 'same-origin',
    cache: new InMemoryCache().restore(state),
  });
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
        <Auth>
          <Layout />
          </Auth>
        </BrowserRouter>
    </ApolloProvider>
  );
};


const app = document.getElementById("root");

if (app === null) {
  throw new Error("Element with id app was not found");
}

hydrate(<App />, app);
