import express from 'express';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import * as crypto from 'crypto';
import cors from 'cors';
import path from 'path';
import routesConfig from './app/configs/routesConfig';
import mediaServer from './mediaServer';
import imageCron from './app/helpers/imageCron';
import middleware from './app/middleware';
import swaggerConfig from './app/swaggerUI/config';

dotenv.config();

imageCron.start();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/', swagger.serve);
app.get('/', swagger.setup(swaggerConfig));

routesConfig.post.forEach(([route, callback]) => {
  app.post(route, callback);
});

Object.entries(routesConfig).forEach(([requestType, routes]) =>
  routes.forEach(([route, callback, auth]) => {
    if (auth) {
      app[requestType](route, middleware, callback);
    } else {
      app[requestType](route, callback);
    }
  })
);

process.env.APP_ROOT = path.resolve(`${__dirname}/..`);
process.env.SECRET_KEY = crypto.randomBytes(64).toString('hex');

app.listen(process.env.PORT, () => {
  console.log('Server has been started!');
});

mediaServer.run();
