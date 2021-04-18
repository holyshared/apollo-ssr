import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetUserDocument, GetUserQuery, GetUserQueryVariables, Gategory } from '../../server/graphql/graphql-client';
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { stringify, parse } from "query-string";

function CategoryList({ items }: { items: Gategory[] }) {
  return (<ul>
    {items.map(item => (<li key={item.id}>{item.name}</li>))}
  </ul>);
}

function NextPage({ after, first = 10 }: { first?: number, after?: string }) {
  const params = { first };
  if (after) {
    Object.assign(params, { after });
  }
  const q = stringify(params);
  const to = `/categories?${q}`;
  return (<Link to={to}>Next page</Link>)
}

export function Categories() {
  const location = useLocation<{ first?: string, after?: string }>();
  const params = parse(location.search) as { first?: string, after?: string };
  const first = isNaN(Number(params.first)) ? Number(params.first) : 10;
  const after = params.after ? params.after : null;
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: {
      name: 'guest',
      categoryPaging: {
        first,
        after
      }
    },
  });

  const categories = data?.user?.categories.edges || [];
  const pageInfo = data?.user?.categories.pageInfo || { hasNextPage: false, endCursor: null };
  const showMoreAfter = pageInfo.endCursor ? pageInfo.endCursor : null;
  return (
    <>
      <h2>Categories</h2>
      {loading ? (<div>loading</div>) : null}
      {error ? (<div>{error.message}</div>) : null}
      <p>{data?.user?.name}</p>
      {categories.length > 0 ? (<CategoryList items={categories} />) : <p>empty</p>}
      {pageInfo.hasNextPage ? (<NextPage after={showMoreAfter} />) : null}
    </>
  );
}