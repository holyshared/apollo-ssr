import React, { PropsWithChildren } from "react";
import { RouteComponentProps } from "react-router-dom";

export function Status(
    props: PropsWithChildren<
    RouteComponentProps<{}> & { code: number; message: string }
  >
) {
  const { code, message, staticContext, children } = props;
  if (staticContext) {
    staticContext.statusCode = code;
  }
  return (
    <>
      <h2>
        <span>{code}</span>
        <span>{message}</span>
      </h2>
      {children}
    </>
  );
}
