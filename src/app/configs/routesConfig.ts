import { request, response } from 'express';
import registration from '../../routes/registration';
import authentication from '../../routes/authentication';
import streamImages from '../../routes/streamImages';
import availableStreams from '../../routes/availableStreams';
import { swagger } from '../../routes/swagger';

interface RoutesConfig {
  [key: string]: [
    string,
    (req: typeof request, res: typeof response) => Promise<any>,
    boolean
  ][];
}

const routesConfig: RoutesConfig = {
  post: [
    ['/auth/registration', registration, false],
    ['/auth/login', authentication, false],
  ],
  get: [
    ['/streams/images', streamImages, false],
    ['/streams', availableStreams, true],
  ],
};

export default routesConfig;
