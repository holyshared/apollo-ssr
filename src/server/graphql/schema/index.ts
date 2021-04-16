import * as fs from "fs";
import * as path from "path";
import { gql } from "apollo-server-express";

const schemePath = path.resolve("./src/server/graphql/schema/schema.graphql");
const scheme = fs.readFileSync(schemePath, { encoding: "utf8" });

export const typeDefs = gql`
  ${scheme}
`;
