import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

export const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});
