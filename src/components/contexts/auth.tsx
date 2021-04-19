import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { ViewerDocument, ViewerQuery, ViewerQueryVariables } from '../../server/graphql/graphql-client';

interface Viewer {
  name: string
}

interface Guest extends Viewer {
}

interface Author extends Viewer {
  id: string
}

type GuestOrAuthor = Guest | Author;

const guest = {
  name: 'guest'
};

export const AuthContext = React.createContext<GuestOrAuthor>(guest);

export function AuthProvider(props: PropsWithChildren<{}>) {
  const { data, error, loading } = useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, {
  });
  const viewer = data?.viewer ? (data?.viewer as Author) : guest;
  return (
    <AuthContext.Provider value={viewer}>
      {error ? (<p>{error.message}</p>) : null}
      {loading ? (<p>loading</p>) : null}
      {props.children}
    </AuthContext.Provider>
  );
}