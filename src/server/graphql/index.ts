import { ApolloServer } from "apollo-server-express";
import { Request, Response } from "express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

export interface GraphQLContext {
  viewer?: { id: number, name: string };
  signIn(authorizedUser: { id: number, name: string }): Promise<any>;
  signOut(): void;
};

type LoginCallback<TUser> = (user: TUser, callback: (err?: Error) => void) => void;

interface GraphQLContextArgs {
  req: Request & { viewer?: {id:number, name:string}, logIn: (user: any, callback: LoginCallback<any>) => void; } & { session: { destroy: () => void } };
  res: Response;
};

export const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (args: GraphQLContextArgs) : GraphQLContext  => {
    const { req } = args;
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
      }
    };
  }
});
