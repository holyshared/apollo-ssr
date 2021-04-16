import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetUserDocument, GetUserQuery, GetUserQueryVariables, Gategory } from '../../server/graphql/graphql-client';

function CategoryList({ items }: { items: Gategory[] }) {
  return (<ul>
    {items.map(item => (<li key={item.id}>{item.name}</li>))}
  </ul>);
}

export function Categories() {
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: {
      name: 'guest',
      categoryPaging: {
        first: 30,
        after: "1"
      }
    },
  });

  const categories = data?.user?.categories.edges || [];
  return (
    <>
      <h2>Categories</h2>
      {loading ? (<div>loading</div>) : null}
      {error ? (<div>{error.message}</div>) : null}
      <p>{data?.user?.name}</p>
      {categories.length > 0 ? (<CategoryList items={categories} />) : <p>empty</p>}
    </>
  );
}