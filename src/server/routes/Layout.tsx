import React from 'react';
import { NavLink } from 'react-router-dom';
import { Top } from "../../components/pages/top";
import { Categories } from "../../components/pages/categories";
import { NotFound } from "../../components/pages/not_found";
import { renderRoutes } from "react-router-config";

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
  return (
    <div>
      <h1>Example</h1>
      <ul>
        <li><NavLink to="/">top</NavLink></li>
        <li><NavLink to="/categories">categories</NavLink></li>
      </ul>
      {renderRoutes(routes)}
    </div>
  );
};
