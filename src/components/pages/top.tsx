import React, { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { UserDocument, UserQueryVariables } from '../../server/graphql/graphql-client';

export function Top() {
  const history = useHistory();
  const [login, options] = useLazyQuery<any, UserQueryVariables>(UserDocument, {
    onCompleted: () => {
      history.push('/dashboard');
    }
  });
  const onSignInClick = useCallback(
    () => {
      login({
        variables: {
          name: 'demo',
          password: 'demo',
        }
      });
    },
    [login]
  );
  return (
    <div>
      <h2>Top</h2>
      <input type="button" name="login" value="signIn" onClick={onSignInClick} />
    </div>
  );
}