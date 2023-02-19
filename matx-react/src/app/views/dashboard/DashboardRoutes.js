import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

//home dasboart del home
const dashboardRoutes = [
  { path: '/dashboard/default',
   element: <Analytics />, 
  //  auth: authRoles.admin 
  },
];

export default dashboardRoutes;
