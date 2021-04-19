import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Top } from "../../components/pages/top";
import { Categories } from "../../components/pages/categories";
import { NotFound } from "../../components/pages/not_found";
import { renderRoutes } from "react-router-config";
import { AuthContext } from "../../components/contexts/auth";

const routes = [
  {
    path: "/",
    exact: true,
    component: Top,
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
  const viewer = useContext(AuthContext);
  return (
    <div>
      <header>
        <h1>Example</h1>
        <p>{viewer.name}</p>
      </header>
      <ul>
        <li><NavLink to="/">top</NavLink></li>
        <li><NavLink to="/categories">categories</NavLink></li>
      </ul>
      {renderRoutes(routes)}
    </div>
  );
};
