import { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";
import { AuthProvider } from '../../components/contexts/auth';
import React from "react";

export function Auth(props: PropsWithChildren<{}>) {
  const history = useHistory();
  return (
    <AuthProvider history={history}>
      {props.children}
    </AuthProvider>
  );
}
