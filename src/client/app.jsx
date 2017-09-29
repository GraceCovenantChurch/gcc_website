
import React from 'react';
import {render} from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import routes from './routes';
import reducers from './modules';

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(thunk));
delete window.__INITIAL_STATE__;

const AppRouter = ({routes}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        { renderRoutes(routes) }
      </BrowserRouter>
    </Provider>
  )
}

render(<AppRouter routes={routes} />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept('./routes', () => render(<AppRouter routes={require('./routes').default} />, document.querySelector('#app')));
}
