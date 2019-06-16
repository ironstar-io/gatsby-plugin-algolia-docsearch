# gatsby-plugin-algolia-docusearch

Easily add Algolia DocuSearch to your Gatsby site.

Inspired by the code at [https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager)

## Install

`npm install --save gatsby-plugin-algolia-docusearch`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-algolia-docusearch`,
    options: {
      apiKey: "ALGOLIA_DOCUSEARCH_API_KEY", // required
      indexName: "ALGOLIA_DOCUSEARCH_INDEX_NAME", // required
      inputSelector: "ALGOLIA_DOCUSEARCH_INPUT_SELCTOR", // required
      debug: false // (bool) Optional. Default `false`
    }
  }
];
```

The fields `apiKey`, `indexName` and `inputSelector` must be set. This plugin has been configured not to throw when one
of these is missing, rather, it will simply do nothing.
