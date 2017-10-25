import path from 'path';
import asyncComponent from '../client/hoc/asyncComponent';
import AdminTemplate from './templates/AdminTemplate';
import NotFound from '../client/pages/NotFound';
import Events from './pages/Events';

const routes = [
  {
    component: AdminTemplate,
    routes: [
      {
        path: '/events',
        component: Events,
      },
      {
        component: NotFound,
      }
    ],
  },
];

export default routes;
