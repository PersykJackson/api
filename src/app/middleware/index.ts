import { NextFunction, request, response } from 'express';
import jwt from 'jsonwebtoken';

const middleware = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader) {
    res.status(401).send('Token not found!');

    return;
  }

  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if (error) {
      res.status(403).json('Incorrect token!');
    } else {
      next();
    }
  });
};

export default middleware;
