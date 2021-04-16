import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetUserDocument, GetUserQuery, GetUserQueryVariables } from '../../server/graphql/graphql-client';

export function Categories() {
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: {
      name: 'guest'
    },
  });
  return (
    <>
      <h2>Categories</h2>
      {loading ? (<div>loading</div>) : null}
      {error ? (<div>{error.message}</div>) : null}
      <p>{data?.user?.name}</p>
    </>
  );
}