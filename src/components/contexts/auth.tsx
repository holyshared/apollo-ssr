import React, { PropsWithChildren } from 'react';

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
  return (
    <AuthContext.Provider value={guest}>
      {props.children}
    </AuthContext.Provider>
  );
}