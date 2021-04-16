import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import fetch from 'cross-fetch';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getDataFromTree } from "@apollo/client/react/ssr";
import { graphqlServer } from "./graphql";

import { Layout } from './routes/Layout';
import { Html } from '../components/html';

const app = express();

graphqlServer.applyMiddleware({ app });

app.use((req, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(App).then((content) => {
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;

    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  });
});

app.listen(3000, () => console.log(
  `app Server is now running on http://localhost:3000`
));
