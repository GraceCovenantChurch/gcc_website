import path from 'path';
import asyncComponent from '../client/hoc/asyncComponent';
import AdminTemplate from './templates/AdminTemplate';
import NotFound from '../client/pages/NotFound';
import Announcements from './pages/Announcements';

const routes = [
  {
    component: AdminTemplate,
    routes: [
      {
        path: '/announcements',
        component: Announcements,
      },
      {
        component: NotFound,
      }
    ],
  },
];

export default routes;
