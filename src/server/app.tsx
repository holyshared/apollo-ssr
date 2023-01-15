import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import express, { Request, Response, NextFunction } from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { graphqlServer, context } from "./graphql";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Layout } from "./routes/layout";
import { Auth } from "./routes/auth";
import { Html } from "../components/html";
import passport from "passport";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import http from "http";
import { Strategy, IVerifyOptions } from "passport-local";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

const redis = new Redis("redis://127.0.0.1:6379");

const RedisStore = connectRedis(session);

const sessionStore = new RedisStore({
  client: redis,
});

passport.serializeUser(
    (user: { id: number; name: string }, done: (err: any, user: {}) => void) => {
        done(null, user.id);
    }
);

passport.deserializeUser((id: number, done: (err: any, user: {}) => void) => {
  done(null, { id: 2, name: "demo" });
});

passport.use(
    new Strategy(
        (
            username: string,
            password: string,
            done: (error: any, user?: {} | boolean, options?: IVerifyOptions) => void
        ) => {
            return done(null, { id: 2, name: "demo" });
        }
    )
);

const startServer = async () => {
  const app = express();

  app.use(express.static("static", {}));
  app.use((req, _, next) => {
    console.log("%s %s", req.method, req.url);
    next();
  });

  app.use(cookieParser("secret")); // FIXME env
  app.use(
    session({
      cookie: {
        maxAge: 1800000,
        httpOnly: true,
        secure: false,
      },
      store: sessionStore,
      name: "example",
      secret: "secret",
      saveUninitialized: false,
      resave: false,
    })
  );

  app.use(
        passport.initialize({
            userProperty: "viewer",
        })
  );
  app.use(passport.session());

  app.use(express.static("static", {}));
  app.use((req, _, next) => {
    console.log("%s %s", req.method, req.url);
    next();
  });

  app.use(cookieParser("secret")); // FIXME env
  app.use(
    session({
      cookie: {
        maxAge: 1800000,
        httpOnly: true,
        secure: false,
      },
      store: sessionStore,
      name: "example",
      secret: "secret",
      saveUninitialized: false,
      resave: false,
    })
  );

  app.use(
        passport.initialize({
            userProperty: "viewer",
        })
  );
  app.use(passport.session());

  const httpServer = http.createServer(app);
  const server = await graphqlServer(httpServer);
  app.use(
        "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, { context })
  );

  app.use((req, res, next) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: "http://localhost:3000/graphql",
        credentials: "same-origin",
        headers: {
          cookie: req.header("Cookie"),
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
          <Auth>
                        <Layout />
          </Auth>
                </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(App)
            .then((content) => {
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
            })
            .catch(next);
  });

  app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    console.log(err.stack);
    res.status(503);
    res.send(err.message);
    res.end();
  });

  return app;
};

startServer()
    .then((server) => {
        server.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
