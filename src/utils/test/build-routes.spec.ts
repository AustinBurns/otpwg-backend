import { buildRoutes } from '../build-routes';
import express from 'express';
import { exportNamespaceSpecifier } from '@babel/types';

describe('buildRoutes', () => {
  const mockRouter = () => {
    const router = {};

    router['route'] = jest.fn().mockReturnValue(router);
    router['get'] = jest.fn().mockReturnValue(router);
    router['post'] = jest.fn().mockReturnValue(router);
    router['put'] = jest.fn().mockReturnValue(router);
    router['delete'] = jest.fn().mockReturnValue(router);

    return router;
  };
  const controller = {
    list: jest.fn(),
    create: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  jest.spyOn(express, 'Router').mockReturnValue(mockRouter);

  test('should set up get (list) and post methods for the resource route', async () => {
    const result = buildRoutes({ controller, guard: false });

    console.log(result);

    expect(result.status).toBeCalledWith(401);
    expect(result.status().send).toBeCalledWith({ message: 'Unauthorized' });
  });
});
