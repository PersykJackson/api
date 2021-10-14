import { request, response } from 'express';
import register from '../../routes/register';

interface RoutesConfig {
  [key: string]: [
    string,
    (req: typeof request, res: typeof response) => Promise<any>
  ][];
}

const routesConfig: RoutesConfig = {
  post: [['/user', register]],
};

export default routesConfig;
