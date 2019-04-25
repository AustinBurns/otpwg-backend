import express from 'express';

export const buildRoutes = ({ controller, guard, extraRoutes = {} }) => {
  const methodGuards = buildGuardsForRequestMethods(guard);
  const router = express.Router();

  router
    .route(`/`)
    .get(methodGuards.list, controller.list)
    .post(methodGuards.post, controller.create);

  /**
   * Since our id route below will match ANYTHING thing after the resource,
   * we need to specify more specific resource routes befor it so they are
   * matched with first
   *
   * i.e. `/locations/search` needs to be set before `/locations/:id` or else
   * it will try to use `search` as the `:id` portion of the route and fail
   */
  Object.entries(extraRoutes).forEach(({ 0: route, 1: extraRouter }) =>
    router.use(`/${route}`, extraRouter)
  );

  router
    .route(`/:id`)
    .get(methodGuards.get, controller.get)
    .put(methodGuards.put, controller.update)
    .delete(methodGuards.delete, controller.delete);

  return router;
};

const buildGuardsForRequestMethods = guard => {
  const passThrough = (...args) => args[2]();
  const methodGuards = {
    list: passThrough,
    post: passThrough,
    get: passThrough,
    put: passThrough,
    delete: passThrough,
  };

  // If a route guard function or an object with a route guard function and only certain
  // http methods were passed in then set up the http methods to have a route guard
  if (guard) {
    const methodsPassedIn = guard.methods && Array.isArray(guard.methods);
    const guardSetup = {
      methods: methodsPassedIn ? guard.methods : Object.keys(methodGuards),
      guard: methodsPassedIn ? guard.routeGuard : guard,
    };

    guardSetup.methods.forEach(
      method => (methodGuards[method] = guardSetup.guard)
    );
  }

  return methodGuards;
};
