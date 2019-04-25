import config from '../../config';
import { Controller } from '../controllers';
import { Location, User } from '../models';
import { buildRoutes } from '../../utils';
import { routeGuard } from '../../middleware';

import authRouter from './auth.router';
import locationSearchRouter from './location-search.router';

const routes = {
  locations: buildRoutes({
    resource: 'locations',
    controller: new Controller(Location),
    guard: routeGuard,
    extraRoutes: { search: locationSearchRouter },
  }),
  users: buildRoutes({
    resource: 'users',
    controller: new Controller(User),
    guard: { methods: ['get', 'list', 'put', 'delete'], routeGuard },
  }),
  login: authRouter,
};
const setUpRoutes = server =>
  Object.entries(routes).map(({ 0: route, 1: router }) =>
    server.use(`/api/${config.apiVersion}/${route}`, router)
  );

export default setUpRoutes;
