import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as crypto from 'crypto';
import routesConfig from './app/configs/routesConfig';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routesConfig.post.forEach(([route, callback]) => {
  app.post(route, callback);
});

process.env.SECRET_KEY = crypto.randomBytes(64).toString('hex');

app.listen(process.env.PORT, () => {
  console.log('Server has been started!');
});
