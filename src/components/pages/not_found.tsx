import React from "react";
import { Status } from "./_wraper/status";
import { RouteComponentProps } from "react-router-dom";

export function NotFound(props: RouteComponentProps<{}>) {
  return (
    <Status code={404} message="not found" {...props}>
      <p>The page you were looking for was not found</p>
    </Status>
  );
}
