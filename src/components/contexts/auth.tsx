import React from 'react';

interface Viewer {
  name: string
}

interface Guest extends Viewer {
}

interface Author extends Viewer {
  id: string
}

type GuestOrAuthor = Guest | Author;

export const AuthContext = React.createContext<GuestOrAuthor>({
  name: 'guest'
});
