import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import UserValidator from '../app/auth/UserValidator';
import User from '../app/models/User';
import Connection from '../app/database/Сonnection';

const authorization = async (req: typeof request, res: typeof response) => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;

    const validator = new UserValidator({
      username,
      password,
    });
    const userModel = new User(await Connection.getInstance());

    if (
      validator.isValid() &&
      (await userModel.isCorrectPassword({ username, password }))
    ) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: 60 * 10,
      });

      res.status(200).json(`Bearer ${token}`);
    } else {
      res.status(404).json('Incorrect username or password!');
    }
  } else {
    res.status(422).json('Username or password not found in request!');
  }
};

export default authorization;
