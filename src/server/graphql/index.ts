import { ApolloServer } from "@apollo/server";
import { Request, Response } from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

export interface GraphQLContext {
  viewer?: { id: number; name: string };
  signIn(authorizedUser: { id: number; name: string }): Promise<any>;
  signOut(): void;
}

type LoginCallback<TUser> = (
  user: TUser,
  callback: (err?: Error) => void
) => void;

interface GraphQLContextArgs {
  req: Request & {
    viewer?: { id: number; name: string };
    logIn: (user: any, callback: LoginCallback<any>) => void;
    logOut: () => void;
  } & { session: { destroy: () => void } };
  res: Response;
}

export const graphqlServer = async (httpServer) => {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await graphqlServer.start();
  return graphqlServer;
};

export const context = async ({
    req,
    res,
}: GraphQLContextArgs): Promise<GraphQLContext> => {
  return {
        viewer: req.viewer,
        signIn(authorizedUser) {
            return new Promise((resolve, reject) => {
                req.logIn(authorizedUser, (err?: Error) => {
                    if (err) {
                        return reject(err);
                    }
          const { id, name } = authorizedUser;
                    resolve({
            id,
                        name,
          });
                });
      });
        },
        signOut() {
            req.logOut();
      req.session.destroy();
        },
    };
};
