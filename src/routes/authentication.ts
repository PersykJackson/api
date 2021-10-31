import { request, response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserValidator from '../app/auth/UserValidator';
import User from '../app/models/User';
import Connection from '../app/database/Сonnection';

const authentication = async (
  req: typeof request,
  res: typeof response
): Promise<void> => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;

    const validator = new UserValidator({
      username,
      password,
    });
    const userModel = new User(await Connection.getInstance());
    const user = await userModel.findUser(username);

    if (validator.isValid() && user) {
      const isCorrectPassword = bcrypt.compareSync(password, user.password);

      if (isCorrectPassword) {
        const token = jwt.sign({ username }, process.env.SECRET_KEY, {
          expiresIn: 60 * 10,
        });

        res.status(200).json(`Bearer ${token}`);
      } else {
        res.status(404).json('Incorrect username or password!');
      }
    } else {
      res.status(404).json('Incorrect username or password!');
    }
  } else {
    res.status(422).json('Username or password not found in request!');
  }
};

export default authentication;
