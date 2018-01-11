import AdminTemplate from './templates/AdminTemplate';
import NotFound from '../client/pages/NotFound';
import Events from './pages/Events';
import Ministries from './pages/Ministries';

const routes = [
  {
    component: AdminTemplate,
    routes: [
      {
        path: '/events',
        component: Events,
      },
      {
        path: '/ministries',
        component: Ministries,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
