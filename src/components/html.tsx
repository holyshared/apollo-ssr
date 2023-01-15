import React from "react";

export function Html({ content, state }) {
  const dangerouslySetInnerHTML = {
    __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
  }
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script  dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        <script src="/assets/bundle.js"></script>
        <script src="/assets/app.js"></script>
      </body>
    </html>
  );
}
