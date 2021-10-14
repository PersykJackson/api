import { request, response } from 'express';
import register from '../../routes/register';
import authorization from '../../routes/authorization';

interface RoutesConfig {
  [key: string]: [
    string,
    (req: typeof request, res: typeof response) => Promise<any>
  ][];
}

const routesConfig: RoutesConfig = {
  post: [
    ['/user', register],
    ['/authorization', authorization],
  ],
};

export default routesConfig;
