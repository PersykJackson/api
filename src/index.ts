import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routesConfig from './app/configs/routesConfig';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routesConfig.post.forEach(([route, callback]) => {
  app.post(route, callback);
});

app.listen(process.env.PORT, () => {
  console.log('Server has been started!');
});
