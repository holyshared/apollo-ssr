const User = {
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
