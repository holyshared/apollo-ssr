import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import fetch from 'cross-fetch';
import express, { Request, Response, NextFunction } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getDataFromTree } from "@apollo/client/react/ssr";
import { graphqlServer } from "./graphql";

import { Layout } from './routes/Layout';
import { Html } from '../components/html';

const app = express();

app.use(
  express.static("static", {})
);
app.use((req, _, next) => {
  console.log("%s %s", req.method, req.url);
  next();
});

graphqlServer.applyMiddleware({ app });

app.use((req, res, next) => {
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

  const context = { statusCode: 200 } as { statusCode: number };

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
    const statusCode = context.statusCode;

    res.status(statusCode);
    res.send(`<!doctype html>\n
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon@2x.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      ${ReactDOM.renderToStaticMarkup(html)}
    `);
    res.end();
  }).catch(next);
});

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  console.log(err.stack);
  res.status(503);
  res.send(err.message);
  res.end();
});

app.listen(3000, () => console.log(
  `app Server is now running on http://localhost:3000`
));
