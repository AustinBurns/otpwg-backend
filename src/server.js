import express from 'express';

import config from './config';
import connectToDb from './utils/db';
import setUpRoutes from './api/routes';
import setUpMiddleware from './middleware';

// Instantiate the server
const app = express();

// Register all app middleware
setUpMiddleware(app);

// Register all routes
setUpRoutes(app);

export const start = async () => {
  try {
    // Connect to the database
    await connectToDb();

    //Start the api server
    app.listen(config.port, () =>
      console.log(
        `API running at http://localhost:${config.port}/api/${
          config.apiVersion
        }/`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

export default app;
