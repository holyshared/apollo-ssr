import React from 'react';
import { Link } from 'react-router-dom';
import { Top } from "../../components/pages/top";
import { Categories } from "../../components/pages/categories";
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
  }
];

export const Layout = () => {
  return (
    <div>
      <h1>a</h1>
      <ul>
        <li><Link to="/">top</Link></li>
        <li><Link to="/categories">categories</Link></li>
      </ul>
      {renderRoutes(routes)}
    </div>
  );
};
