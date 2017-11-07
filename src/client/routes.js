import path from 'path';
import asyncComponent from './hoc/asyncComponent';
import MainTemplate from './templates/MainTemplate';
import NotFound from './pages/NotFound';

const routes = [
  {
    component: MainTemplate,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Home'), () => import('./pages/Home')),
      },
      {
        path: '/welcome',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/welcome/Welcome'), () => import('./pages/welcome/Welcome')),
      },
      {
        path: '/page',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Page'), () => import('./pages/Page')),
      },
      {
        path: '/pages/:page',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/AsyncPage'), () => import('./pages/AsyncPage')),
      },
      {
        component: NotFound,
      }
    ],
  },
];

export default routes;
