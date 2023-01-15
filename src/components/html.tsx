import React from "react";

export function Html({ content, state }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
                    }} />
        />
        <script src="/assets/bundle.js"></script>
        <script src="/assets/app.js"></script>
      </body>
    </html>
  );
}
