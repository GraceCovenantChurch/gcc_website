
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import reducers from './modules';

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(thunk));
delete window.__INITIAL_STATE__;

const AppRouter = ({ routes }) => (
  <Provider store={store}>
    <BrowserRouter>
      { renderRoutes(routes) }
    </BrowserRouter>
  </Provider>
);

const routeShape = PropTypes.shape({
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
});
routeShape.routes = PropTypes.arrayOf(routeShape);

AppRouter.propTypes = {
  routes: PropTypes.arrayOf(routeShape).isRequired,
};

function renderApp() {
  // eslint-disable-next-line global-require
  render(<AppRouter routes={require('./routes').default} />, document.querySelector('#app'));
}

renderApp();
if (module.hot) module.hot.accept('./routes', renderApp);
