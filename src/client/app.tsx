import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "../server/routes/layout";
import { Auth } from "../server/routes/auth";
import React from "react";
import { hydrateRoot } from 'react-dom/client';

const state =
"__APOLLO_STATE__" in window
    ? (window["__APOLLO_STATE__"] as unknown as any)
    : {};
const client = new ApolloClient({
uri: "http://localhost:3000/graphql",
credentials: "same-origin",
cache: new InMemoryCache().restore(state),
});

export const App = () => {
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

hydrateRoot(document.getElementById("root"), <App />, {
  onRecoverableError(err) {
    console.log(err);
  }
});
