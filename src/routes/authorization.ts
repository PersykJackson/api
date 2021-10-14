import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import UserValidator from '../app/auth/UserValidator';

const authorization = async (req: typeof request, res: typeof response) => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;

    const validator = new UserValidator({
      username,
      password,
    });

    if (validator.isValid() && (await validator.isExists())) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: 60 * 10,
      });

      res.status(200).send(`Bearer ${token}`);
    } else {
      res.status(400).send('Incorrect login or password!');
    }
  }
};

export default authorization;
