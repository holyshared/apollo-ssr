import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { useSignInMutation } from '../../server/graphql/graphql-client';
import { AuthContext } from '../contexts/auth';

export function Top() {
  const viewer = useContext(AuthContext);
  const history = useHistory();
  const [signIn, { loading }] = useSignInMutation({
    onCompleted: () => {
      history.push('/dashboard');
    }
  });
  const onSignInClick = useCallback(
    () => {
      signIn({
        variables: {
          name: 'demo',
          password: 'demo',
        }
      });
    },
    [signIn]
  );
  return (
    <div>
      <h2>Top</h2>
      {loading ? (<p>sign in ....</p>) : null}
      {viewer ? null : (<input type="button" name="login" value="signIn" onClick={onSignInClick} />)}
    </div>
  );
}