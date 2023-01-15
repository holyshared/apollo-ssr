import { GraphQLContext } from "..";

// FIXME
const mockCategories = (params: { first?: number; after?: string }) => {
  const { after, first } = params;
  const results = [];
  const id = after ? Number(after) : 0;
  const size = first ? Number(first) : 10;

  for (let i = 0; i < size; i++) {
    const catId = id + i + 1;
    results.push({
      id: catId,
      name: `cat${catId}`,
    });
  }
  return results;
};

const User = {
  async categories(
        parent: any,
        args: { paging: { first?: number; after?: string } }
    ) {
    const mock = mockCategories(args.paging);
    return {
      edges: mock,
      pageInfo: {
        startCursor: mock[0].id,
        endCursor: mock[mock.length - 1].id,
        hasNextPage: true,
      },
    };
  },
};

export const viewer = async (parent: any, args: {}, ctx: GraphQLContext) => {
  return ctx.viewer;
};

export const signIn = async (
  parent: any,
  args: {
    name: string;
    password: string;
  },
  ctx: GraphQLContext
) => {
  const user = {
    id: 2,
    name: "demo",
  };
  await ctx.signIn(user);
  return user;
};

export const signOut = async (parent: any, args: {}, ctx: GraphQLContext) => {
  const viewer = ctx.viewer;
  ctx.signOut();
  return viewer;
};

export const getUser = async (
  parent: any,
  args: {
    name: string;
  }
) => {
  return {
    id: 1,
    name: args.name,
  };
};

export const resolvers = {
  User,
  Query: {
    getUser,
    viewer,
  },
  Mutation: {
    signIn,
    signOut,
  },
};
