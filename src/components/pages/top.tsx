import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function Top() {
  const { viewer, signIn } = useContext(AuthContext);
  return (
    <div>
      <h2>Top</h2>
      {viewer ? null : (
                <input type="button" name="login" value="signIn" onClick={signIn} />
            )}
    </div>
  );
}
