import React from "react";
import { stripIndent } from "common-tags";

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { apiKey, indexName, inputSelector, debug = false }
) => {
  if (!apiKey || !indexName || !inputSelector) {
    return;
  }

  setHeadComponents([
    <link
      key="plugin-docsearch-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
    />
  ]);

  setPostBodyComponents([
    <script
      key="plugin-docsearch-js"
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
    />,
    <script
      key="plugin-docsearch-initiate"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: stripIndent`
        var observer = new MutationObserver(function (mutations, instance) {
          var docuSearchElem = document.querySelector('${inputSelector}');
          if (docuSearchElem) {
            docsearch({
              apiKey: "${apiKey}",
              indexName: "${indexName}",
              inputSelector: "${inputSelector}",
              debug: ${debug === true ? "true" : "false"}
            });
            instance.disconnect(); // stop observing
            return;
          }
        });

        // start observing
        document.addEventListener("DOMContentLoaded", function() {
          observer.observe(document, {
            childList: true,
            subtree: true
          });
        });
        `
      }}
    />
  ]);
};
