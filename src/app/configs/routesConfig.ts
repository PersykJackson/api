import { request, response } from 'express';
import registration from '../../routes/registration';
import authentication from '../../routes/authentication';
import streamImages from '../../routes/streamImages';

interface RoutesConfig {
  [key: string]: [
    string,
    (req: typeof request, res: typeof response) => Promise<any>
  ][];
}

const routesConfig: RoutesConfig = {
  post: [
    ['/auth/registration', registration],
    ['/auth/login', authentication],
  ],
  get: [['/streamImages', streamImages]],
};

export default routesConfig;
