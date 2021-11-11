import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as crypto from 'crypto';
import cors from 'cors';
import routesConfig from './app/configs/routesConfig';
import mediaServer from './mediaServer';
import imageCron from './app/helpers/imageCron';

dotenv.config();

imageCron.start();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

routesConfig.post.forEach(([route, callback]) => {
  app.post(route, callback);
});

process.env.SECRET_KEY = crypto.randomBytes(64).toString('hex');

app.listen(process.env.PORT, () => {
  console.log('Server has been started!');
});

mediaServer.run();
