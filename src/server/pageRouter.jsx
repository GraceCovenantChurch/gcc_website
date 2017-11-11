import { Router } from 'express';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Helmet } from 'react-helmet';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

export default function PageRouter(routes, reducers, renderCallback) {
  const router = Router();
  const store = createStore(reducers, applyMiddleware(thunk));

  router.get('*', (req, res) => {
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route, match }) => {
      const fetchData = route.component.fetchData;

      return fetchData instanceof Function ? fetchData(store, match) : Promise.resolve(null);
    });
    return Promise.all(promises).then(() => {
      const context = {};
      const content = renderToStaticMarkup(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <div id="app">{renderRoutes(routes)}</div>
          </StaticRouter>
        </Provider>
      );
      const helmet = Helmet.renderStatic();
      if (context.status === 404) {
        res.status(404);
      }
      if (context.status === 302) {
        return res.redirect(302, context.url);
      } else {
        return res.send(renderCallback(helmet, content, store.getState()));
      }
    });
  });

  return router;
}
