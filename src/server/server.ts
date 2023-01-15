import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import express, { Request, Response, NextFunction } from "express";
import { renderToPipeableStream } from "react-dom/server";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { graphqlServer, context } from "./graphql";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import http from "http";
import { Strategy, IVerifyOptions } from "passport-local";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import React from "react";
import {App} from "./app";
import {Html} from "../components/html";

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
    const app = React.createElement(App, {
      url: req.url,
      client,
      context
    });

    getDataFromTree(app).then((content) => {
      const initialState = client.extract();
      const statusCode = context.statusCode;

      const html = React.createElement(Html, {
        content,
        state: initialState
      });

      res.status(statusCode);

      const stream = renderToPipeableStream(html, {
        onShellReady() {
          res.status(statusCode);
          res.setHeader('Content-type', 'text/html');
          stream.pipe(res);
        }
      });

    }).catch(next);
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
