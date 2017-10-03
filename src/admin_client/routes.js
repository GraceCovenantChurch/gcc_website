import path from 'path';
import asyncComponent from '../client/hoc/asyncComponent';
import AdminTemplate from './templates/AdminTemplate';
import NotFound from '../client/pages/NotFound';

const routes = [
  {
    component: AdminTemplate,
    routes: [
      {
        path: '/',
        exact: true,
        component: NotFound,
      },
      {
        path: '/announcements',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Announcements'), () => import('./pages/Announcements')),
      },
      {
        component: NotFound,
      }
    ],
  },
];

export default routes;
