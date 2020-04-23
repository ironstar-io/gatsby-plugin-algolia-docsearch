import React from "react";
import { stripIndent } from "common-tags";

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  configuration,
) => {
  if (!configuration) {
    return;
  }

  if (!Array.isArray(configuration)) {
    configuration = [configuration];
  }

  configuration = configuration.filter(spec => {
    return spec.apiKey && spec.indexName && spec.inputSelector;
  });

  if (configuration.length === 0) {
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
    ...configuration.map(({ apiKey, indexName, inputSelector, debug = false }) => (
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
    ),
  ]);
};
