import React from "react";

export function Html({ content, state }) {
  const dangerouslySetInnerHTML = {
    __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
  }
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon@2x.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body>
        <article id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script  dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        <script src="/assets/bundle.js"></script>
        <script src="/assets/app.js"></script>
      </body>
    </html>
  );
}
