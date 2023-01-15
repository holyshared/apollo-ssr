import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Gategory = {
  __typename?: "Gategory";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type GategoryPaging = {
  __typename?: "GategoryPaging";
  edges?: Maybe<Array<Maybe<Gategory>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type IdCursor = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["ID"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  signIn: User;
  signOut: User;
};

export type MutationSignInArgs = {
  name: Scalars["String"];
  password: Scalars["String"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage?: Maybe<Scalars["Boolean"]>;
  hasPreviousPage?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  viewer?: Maybe<User>;
  getUser?: Maybe<User>;
};

export type QueryGetUserArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  categories?: Maybe<GategoryPaging>;
};

export type UserCategoriesArgs = {
  paging?: Maybe<IdCursor>;
};

export type SignInMutationVariables = Exact<{
  name: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
  viewer: { __typename?: "User" } & Pick<User, "id" | "name">;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation" } & {
  viewer: { __typename?: "User" } & Pick<User, "id" | "name">;
};

export type GetUserQueryVariables = Exact<{
  name?: Maybe<Scalars["String"]>;
  categoryPaging?: Maybe<IdCursor>;
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  user?: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name"> & {
        categories?: Maybe<
          { __typename?: "GategoryPaging" } & {
            edges?: Maybe<
              Array<
                Maybe<
                  { __typename?: "Gategory" } & Pick<Gategory, "id" | "name">
                >
              >
            >;
            pageInfo?: Maybe<
              { __typename?: "PageInfo" } & Pick<
                PageInfo,
                "startCursor" | "endCursor" | "hasNextPage"
              >
            >;
          }
        >;
      }
  >;
};

export type ViewerQueryVariables = Exact<{ [key: string]: never }>;

export type ViewerQuery = { __typename?: "Query" } & {
  viewer?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>;
};

export const SignInDocument = gql`
  mutation signIn($name: String!, $password: String!) {
    viewer: signIn(name: $name, password: $password) {
      id
      name
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation signOut {
    viewer: signOut {
      id
      name
    }
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
export const GetUserDocument = gql`
  query getUser($name: String, $categoryPaging: IDCursor) {
    user: getUser(name: $name) {
      id
      name
      categories(paging: $categoryPaging) {
        edges {
          id
          name
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *      categoryPaging: // value for 'categoryPaging'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const ViewerDocument = gql`
  query viewer {
    viewer: viewer {
      id
      name
    }
  }
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<
  ViewerQuery,
  ViewerQueryVariables
>;
