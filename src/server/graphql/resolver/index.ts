const User = {
  async categories(parent: any, args: any) {
    return {
      edges: [{
        id: 1,
        name: "cat1"
      }],
      pageInfo: {
        startCursor: 1,
        endCursor: 2,
        hasNextPage: true
      }
    };
  }
};

export const getUser = async (
  parent: any,
  args: {
    name: string
  },
) => {
  return {
    id: 1,
    name: args.name
  }
};

export const resolvers = {
  User,
  Query: {
    getUser
  },
};
