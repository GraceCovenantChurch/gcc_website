# Getting Started Guide

## History

Web applications are composed of three major parts: HTML, CSS, and JavaScript. Historically, pages were predominantly HTML documents with some CSS for styling and JavaScript for dynamic page behavior / animations / effects.

Here are some reasons why this is difficult to work with:
- It's not modular. There is no inherent way to easily reuse components in different parts of your website.
    - Each page needs to provide the full HTML.
    - Websites also usually end up with one monolothic CSS file
    - Furthermore, because JavaScript files by default cannot access variables in other JavaScript files without making things globally accessible (bad), applications also need to have one very large monolithic script.
- DOM updates are slow. The DOM is the Document Object Model. HTML is a heirarchy of these DOM nodes which have CSS styles and contain the website's content. Updates propogate changes throughout the tree and can slow down page performance.

## React

[React](https://reactjs.org/) is just one of many modern web frameworks which aim to ease the process of developing quality web applications. Briefly, what React aims to do is move all the heavy lifting to the JavaScript side. The entire DOM tree is stored virtually and when updates occur, React calculates the minimum changes to the DOM tree needed and applies them in batch.

React has `Component`s which help solve the problem of modularity. We can package up a bunch of DOM nodes and behaviors into a single reusable component. Each provides its own functions to handle mounting / unmounting, rendering, updating, etc. Check out the [component lifecycles](https://reactjs.org/docs/react-component.html) for more information.

Here is an example. Notice that React lets us conveniently mix HTML and JavaScript. This is enormously helpful!
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState({
      count: count + this.props.increment,
    });
  }

  render() {
    return <h1 onClick={this.handleClick.bind(this)}>The count is {this.state.count}</h1>;
  }
}
```
Usage: `<Counter increment={5} />`

React Components have the idea of `state` and `props`. State is something that is internal to the component which it uses to keep track of things. `props` are something that are external set on the component. In the example above, `increment` is a `prop`. It is set as `5` on the `Counter` when we make it. `count` is part of the state and internally keeps track of `this.props.increment * numberOfTimesClicked`. When `state` or `props` change, React then re-renders the dependent parts of the component.

## All the Other Third-Party Libraries

Before explaining what all the other pieces of technology that we're using do, I will first highlight important aspects about how we want our application to be so that the motivation for using a particular piece of technology makes sense.

1. **Modular**. We want to be able to split our code into multiple files with reusable components so developing is not an insane mess. (I explained the reusable components but this doesn't solve the multiple files part)

2. **Fast updates in development**. We want to be able to work quickly on the website without having to refresh the page over and over and wait for the application to build.

3. **Server-side rendering**. With JavaScript frameworks, it's easy for pages to look something like this:
```
<html>
    <body>
        <script src="/assets/app.bundle.js"></script>
    </body>
</html>
```
You render an empty page and then the JavaScript does all the rest. This is super easy and convenient but terrible for SEO (search engine optimization). Crawlers look at your page and see nothing on it. We want to render the full page on the server as well so that it contains the full content even before the JavaScript runs.


## Webpack

Webpack is this really awesome piece of technology that bundles applications. It takes serveral JavaScript files and puts them all into one JavaScript file (without globally accessible variables) and allows them to `import` from each other. This allows one module to export functions which another module imports and uses.

Webpack also allows us to define different chunks or bundles to create. Check out `src/webpack.config.js` which contains something like this:
```javascript
const path = require('path');

module.exports = require('./webpack.common')('common', {
  app: path.resolve(__dirname, 'client/app.jsx'),
  'pages/Home': path.resolve(__dirname, 'client/pages/Home.jsx'),
  'pages/Page': path.resolve(__dirname, 'client/pages/Page.jsx'),
  'pages/AsyncPage': path.resolve(__dirname, 'client/pages/AsyncPage.jsx'),
});
```

Here, we're defining different entry points for Webpack to use. It will build one bundle for the main app, and then build a separate bundle for each page. This helps us be **modular**. We don't need a page until we navigate there so we can keep it in a separate file.

Webpack also has several plugins like the `CommonsChunkPlugin`. If you look in `src/webpack.common.js`, you'll see something like this:
```javascript
new webpack.optimize.CommonsChunkPlugin({
    name: 'react',
    minChunks(module, count) {
    var context = module.context;
    return context && (
        context.indexOf(path.join('node_modules', 'react')) >= 0 ||
        context.indexOf(path.join('node_modules', 'redux')) >= 0 ||
        context.indexOf(path.join('node_modules', 'fbjs')) >= 0 ||
        context.indexOf(path.join('node_modules', 'prop-types')) >= 0
    );
    },
}),
new webpack.optimize.CommonsChunkPlugin({
  name: commonName,
  chunks: Object.keys(targets),
  minChunks: 2,
}),
new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })
```

Again, this helps with being modular. The first one takes all the React libraries and other third-party libraries and puts them into one bundle called `react`. We know that these will be used on pretty much every page. The second one takes all the other modules that are used at least twice and puts them into another chunk. The last one makes one chunk to keep track of all the other chunks. It maintains a mapping from module to chunk name so that when you import a module that is not loaded, the application knows how to load it.

Webpack also has the notion of `loaders` which handle how different types of files are imported. If you look in `src/webpack.config.js`, you'll see something like:
```
const styleLoaders = [
  nconf.get('NODE_ENV') !== 'production' ? 'style-loader' : undefined,
  {
    loader: 'css-loader',
    options: { importLoaders: 1, minimize: nconf.get('NODE_ENV') === 'production' },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('postcss-import')({ root: loader.resourcePath }),
        require('postcss-nested')(),
        require('postcss-cssnext')({
          browsers: ['last 2 versions', '> 5%'],
        }),
      ],
      sourceMap: nconf.get('NODE_ENV') !== 'production' ? 'inline' : undefined,
    },
  },
].filter(loader => loader);

...

{
  test: /\.css$/,
  use: nconf.get('NODE_ENV') !== 'production' ? styleLoaders : ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: styleLoaders,
  }),
},
```

This is defining loaders to use for CSS files. This tells Webpack that when you try to import a `.css` file, to use these `postcss-loader` and `css-loader`, and `ExtractTextPlugin`, etc.

All of this lets JavaScript modules import CSS files. When we create `app.js`, we also create `app.bundle.css`. This also helps with staying **modular**, we only need to include styles that are actually being used for the components defined in `app.js`.

## Babel

You'll notice that `src/webpack.common.js` also has something called `babel-loader`. Babel is a transpiler. All of these nice things that we're talking about: imports, exports, HTML in JavaScript, etc. Aren't supported in the JavaScript that runs in most browsers. Babel transpiles all this fancy syntax to what browsers actually understand. We can write code for modern JavaScript, but still maintain support for previous versions.

## Webpack Dev Server

In `src/webpack.common.js`, you'll see:
```javascript
function addHMR(target) {
  return nconf.get('NODE_ENV') !== 'production' ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + nconf.get('CLIENT_HOST') + ':' + nconf.get('CLIENT_PORT'),
    'webpack/hot/only-dev-server',
    target,
  ] : target;
}

...

devServer: {
  host: nconf.get('CLIENT_HOST'),
  port: nconf.get('CLIENT_PORT'),
  historyApiFallback: true, // respond to 404s with index.html
  hot: true, // enable HMR on the server
  inline: true,
  compress: true,
  overlay: {
    errors: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
  },
},
```

This is some configuration for Webpack dev server. The first part adds some modules to every entry point so that it's hot-reloadable. The last part is some configuration for the server. `webpack-dev-server` watches for changes, and then updates them on the page automatically. This is extremely convenient for development. Changes you make can be instantly seen on the screen!

## Redux

Redux takes React's idea of Component state and pulls it out above the application and shifts the perspective on data flow. Traditionally, applications can get very messy. Different components all have their own state and A updates B which updates C which then updates both B and D which updates A, and it can be very, very complex. The idea with Redux is that there is one global state object from which everything propogates down. Components can `dispatch` actions which update the global state (`store`), and then everything else inherits from those changes.

Not only is this simpler, but it also makes **server-side rendering** much, much easier. For a given page, we can put the data together, set it on the global state, and then tell React to render the application. With a strictly top-down approach, everything will properly inherit from the data.

Here's a simple example for a dynamic page. `fetchPage` is a function which generates a function that will make an API call to fetch the page content. When it is done, it will `dispatch` a `PAGE_LOADED` action. The `page` function handles that action and will update the state with the new title and content.

```javascript
const initialState = {
  title: '',
  content: '',
};

export const PAGE_LOADED = 'PAGE_LOADED';

export default function page(state = initialState, action) {
  switch(action.type) {
    case PAGE_LOADED:
      return Object.assign({}, state, {
        title: action.title,
        content: action.content,
      });

    default:
      return state;
  }
}

export const fetchPage = (page) => (dispatch) => {
  const SERVER_HOST = nconf.get('SERVER_HOST');
  const SERVER_PORT = nconf.get('SERVER_PORT');

  return fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/pages/${page}`)
  .then(res => res.json())
  .then(({title, content}) => dispatch({
    type: PAGE_LOADED,
    title,
    content
  }));
}
```

Take a look at the `connect` function from `react-redux`. It wraps our `AsyncPage` in a Component which has some extra `props` generated from `mapStateToProps` and `mapDispatchToProps`. Above, we saw how the `store` is updated. `mapStateToProps` now takes that global state and extracts props for this `AsyncPage`. `mapDispatchToProps` adds a `prop` which is a function called `fetchPage` which dispatches a request for the page's content.

```javascript
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage} from '../modules/page';

class AsyncPage extends Component {

  static fetchData({dispatch}, match) {
    return dispatch(fetchPage(match.params.page)).then(result => dispatch(setTitle(result.title)));
  }

  componentDidMount() {
    this.props.fetchPage();
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.content}</div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return state.page;
}

function mapDispatchToProps(dispatch, ownProps) {
  const page = ownProps.match.params.page;
  return {
    fetchPage() {
      return dispatch(fetchPage(page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncPage);
```

Thus, here's what will happen:
1. The component will mount and `componentDidMount` will be called.
2. This will `dispatch` a request to fetch the page by doing `dispatch(fetchPage(page))`
3. Which will make an API call to fetch the data.
4. When the data returns, a `PAGE_LOADED` action will be `dispatch`ed which will update the global state.
5. `AsyncPage` will inherit new `title` and `content` props from the global state via `mapStateToProps`.
