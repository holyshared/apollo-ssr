import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { ViewerDocument, ViewerQuery, ViewerQueryVariables } from '../../server/graphql/graphql-client';

interface Viewer {
  name: string
}

interface Author extends Viewer {
  id: string
}

export const AuthContext = React.createContext<Author>(null);

export function AuthProvider(props: PropsWithChildren<{}>) {
  const { data, error, loading } = useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, {
    fetchPolicy: 'network-only'
  });
  const viewer = data?.viewer ? (data?.viewer as Author) : null;
  return (
    <AuthContext.Provider value={viewer}>
      {error ? (<p>{error.message}</p>) : null}
      {loading ? (<p>loading</p>) : null}
      {props.children}
    </AuthContext.Provider>
  );
}