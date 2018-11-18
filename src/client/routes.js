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
        path: '/beliefs',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Welcome'), () => import('./pages/Beliefs')),
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
        path: '/familygroup',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/FamilyGroup'), () => import('./pages/FamilyGroup')),
      },
      {
        path: '/ministries',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Ministries'), () => import('./pages/Ministries')),
      },
      {
        path: '/staff',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Staff'), () => import('./pages/Staff')),
      },
      {
        path: '/welcome',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Welcome'), () => import('./pages/Welcome')),
      },
      {
        path: '/events',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Events'), () => import('./pages/Events')),
      },
      {
        path: '/multimedia',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Multimedia'), () => import('./pages/Multimedia')),
      },
      {
        path: '/giving',
        exact: true,
        component: asyncComponent(path.resolve(__dirname, './pages/Giving'), () => import('./pages/Giving')),
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
