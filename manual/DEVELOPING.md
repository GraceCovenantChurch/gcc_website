# Developer's Guide

## Running the Code
Run `npm install` to install all project dependencies.

Create a `config.json` file in the root of the project repository and populate it with configuration variables. Check `src/config.js` to see configuration variables used in the code. Also specified in `src/config.js` are defaults which can be overriden in `config.json`.

```javascript
// Example: config.json
{
  "GOOGLE_MAPS_KEY": "<GOOGLE_MAPS_KEY>",
  "COOKIE_SECRET": "<COOKIE_SECRET>",
  "GOOGLE_CLIENT_ID": "<GOOGLE_CLIENT_ID>",
  "GOOGLE_CLIENT_SECRET": "<GOOGLE_CLIENT_SECRET>"
}
```

Run `npm start` and navigate to `http://localhost:8080` to see the public site or `http://localhost:8081` to see the admin site.

## Creating New Pages
Pages should be created in `src/admin_client/pages` and `src/client/pages` for admin and public pages, respectively. They should then be added to either `src/admin_client/routes.js` or `src/client/routes.js` to match a URL to the page.

```jsx
// Example: src/client/pages/NewPage.jsx

import React from 'react';
import withTitle from '../hoc/withTitle';

const NewPage = () => <div>This is a new page!</div>;

export default withTitle('New Page')(NewPage);
```

```js
// Example: src/client/routes.js

const routes = [
  {
    component: MainTemplate,
    routes: [
      // other routes....

      // This maps exactly the url "/new_page" to render the NewPage component
      {
        path: '/new_page',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/NewPage'), () => import('./pages/NewPage')),
      },

      // other routes...
    ]
  },
]
```

## Creating Separate Bundles
The build system will generate multiple JavaScript and CSS bundles. Usually it's best to create a separate bundle for each page so that the contents of that page are isolated. A separate bundle for `NewPage` allows that code to be loaded _only_ when `NewPage` is rendered.

To add additional bundles to the build system, they'll need to be added to `webpack.config.js`. Continuing with the example above, adding a bundle is done by adding the following to `publicEntry`:

```js
const publicEntry = {
  // other entries...

  'pages/NewPage': 'client/pages/NewPage.jsx'
  // nameOfBundle: path/to/file
};
```
