import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Gategory = {
  __typename?: 'Gategory';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type GategoryPaging = {
  __typename?: 'GategoryPaging';
  edges?: Maybe<Array<Maybe<Gategory>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type IdCursor = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getViewer?: Maybe<User>;
  getUser?: Maybe<User>;
};


export type QueryGetUserArgs = {
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  categories?: Maybe<GategoryPaging>;
};


export type UserCategoriesArgs = {
  paging?: Maybe<IdCursor>;
};

export type GetUserQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  categoryPaging?: Maybe<IdCursor>;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { categories?: Maybe<(
      { __typename?: 'GategoryPaging' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'Gategory' }
        & Pick<Gategory, 'id' | 'name'>
      )>>>, pageInfo?: Maybe<(
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage'>
      )> }
    )> }
  )> }
);

export type GetViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


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
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetViewerDocument = gql`
    query getViewer {
  viewer: getViewer {
    id
    name
  }
}
    `;

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(baseOptions?: Apollo.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, options);
      }
export function useGetViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, options);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = Apollo.QueryResult<GetViewerQuery, GetViewerQueryVariables>;