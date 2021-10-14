import { NextFunction, request, response } from 'express';
import jwt from 'jsonwebtoken';

const middleware = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader) {
    res.status(403).send('Token not found!');

    return;
  }

  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if (error) {
      res.status(403).send('Incorrect token!');
    } else {
      next();
    }
  });
};

export default middleware;
