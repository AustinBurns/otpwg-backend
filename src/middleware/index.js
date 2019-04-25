import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

export * from './route-guard';

const middleware = {
  cors: cors(),
  json: express.json(),
  morgan: morgan('dev'),
};

const setUpMiddleware = server =>
  Object.values(middleware).forEach(ware => server.use(ware));

export default setUpMiddleware;
