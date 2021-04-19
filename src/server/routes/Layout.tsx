import React, { useContext, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Top } from "../../components/pages/top";
import { Categories } from "../../components/pages/categories";
import { Dashboard } from "../../components/pages/dashboard";
import { NotFound } from "../../components/pages/not_found";
import { renderRoutes } from "react-router-config";
import { AuthContext } from "../../components/contexts/auth";
import { useSignOutMutation } from '../graphql/graphql-client';

const routes = [
  {
    path: "/",
    exact: true,
    component: Top,
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/categories",
    exact: true,
    component: Categories,
  },
  {
    path: "*",
    exact: true,
    component: NotFound,
  }
];

export const Layout = () => {
  const history = useHistory();
  const viewer = useContext(AuthContext);
  const [signOut, { loading }] = useSignOutMutation({
    onCompleted() {
      history.push('/');
    }
  });
  const onSignOutClick = useCallback(() => {
    signOut({});
  }, [signOut]);
  const username = viewer ? viewer.name : 'guest';
  return (
    <div>
      <header>
        <h1>Example</h1>
        <p>{username}</p>
        {viewer ? (<input type="button" name="signOut" value="Sign out" onClick={onSignOutClick} />) : null}
        {loading ? (<p>Sign out .....</p>) : null}
      </header>
      <ul>
        <li><NavLink to="/">top</NavLink></li>
        <li><NavLink to="/categories">categories</NavLink></li>
      </ul>
      {renderRoutes(routes)}
    </div>
  );
};
