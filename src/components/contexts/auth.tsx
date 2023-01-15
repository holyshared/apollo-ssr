import React, { useCallback, PropsWithChildren } from "react";
import { useQuery } from "@apollo/client";
import {
  useSignInMutation,
    useSignOutMutation,
    ViewerDocument,
    ViewerQuery,
    ViewerQueryVariables,
} from "../../server/graphql/graphql-client";

interface Viewer {
  name: string;
}

interface Author extends Viewer {
  id: string;
}

interface ContextValue {
  viewer?: Author;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<ContextValue>(
  {} as ContextValue
);

interface AuthProviderProps {
  history: {
    push: (path: string) => void;
  };
}

export function AuthProvider(props: PropsWithChildren<AuthProviderProps>) {
  const { history } = props;
  const [signIn] = useSignInMutation({
    onCompleted: () => {
      refetch();
      history.push("/dashboard");
    },
  });
  const [signOut] = useSignOutMutation({
    onCompleted: () => {
      refetch();
      history.push("/");
    },
  });

  const signInHandle = useCallback(() => {
    signIn({
      variables: {
        name: "demo",
        password: "demo",
      },
    });
  }, [signIn]);

  const signOutHandle = useCallback(() => {
    signOut({});
  }, [signOut]);

  const { data, error, loading, refetch } = useQuery<
    ViewerQuery,
    ViewerQueryVariables
  >(ViewerDocument, {
      fetchPolicy: "network-only",
  });
  const viewer = data?.viewer ? (data?.viewer as Author) : null;
  const contextValue = {
    viewer,
    signIn: signInHandle,
    signOut: signOutHandle,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {error ? <p>{error.message}</p> : null}
      {loading ? <p>loading</p> : null}
      {props.children}
    </AuthContext.Provider>
  );
}
