import path from 'path';
import asyncComponent from '../client/hoc/asyncComponent';
import MainTemplate from './templates/AdminTemplate';
import NotFound from '../client/pages/NotFound';

const routes = [
  {
    component: MainTemplate,
    routes: [
      {
        component: NotFound,
      }
    ],
  },
];

export default routes;
