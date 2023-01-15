import {
  ApolloProvider,
} from "@apollo/client";
import React from "react";
import { StaticRouter } from "react-router";
import { Layout } from "./routes/layout";
import { Auth } from "./routes/auth";

export const App = ({ client, url, context }) => (
  <ApolloProvider client={client}>
    <StaticRouter location={url} context={context}>
      <Auth>
        <Layout />
      </Auth>
    </StaticRouter>
  </ApolloProvider>
);
