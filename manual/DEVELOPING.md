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

## Styling Components

For consistency, each new `.jsx` file should have a corresonding `.css` stylesheet. We're using PostCSS which allows some nice convenient extensions to CSS.

```scss
/* Example: nested styles */
.box {
  .title {
    color: white;

    &:hover {
      color: black;
    }
  }
}

/* Translates to:

.box .title {
  color: white;
}

.box .title:hover {
  color: black;
}

*/
```

The build systems also configures _local namespacing_ for each stylesheet which is very different from traditional CSS. When apply styles, the class names are not applied as strings because there may be multiple stylesheets with the same class name.

**Example: Conflicting class names**

```jsx
// Box1.jsx
const Box1 = () => <div className="box"></div>
```

```css
/* Box1.css */
.box {
  color: white;
}
```

```jsx
// Box2.jsx
const Box2 = () => <div className="box"></div>
```

```css
/* Box2.css */
.box {
  color: black;
}
```

**CSS Modules**

To avoid these problems, we're using [CSS Modules](https://github.com/css-modules/css-modules). The above code is instead written as follows:

```jsx
// Box1.jsx
import styles from './Box1.css';

const Box1 = () => <div className={styles.box}></div>
```

```css
/* Box1.css */
.box {
  color: white;
}
```

```jsx
// Box2.jsx
import styles from './Box2.css';

const Box2 = () => <div className={styles.box}></div>
```

```css
/* Box2.css */
.box {
  color: black;
}
```

In each file, `styles.box` will be replaced with a unique class name to avoid conflicts.
