const contentful = require('contentful');

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'oa3rdschsyrf',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'd12c8d5f672af0a2d39dbb5c65dbc4e82bd592908af32c9f672f454c18027850',
});

export default client;
