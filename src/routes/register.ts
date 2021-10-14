import { request, response } from 'express';
import UserValidator from '../app/auth/UserValidator';
import Connection from '../app/database/Сonnection';
import Collections from '../app/types/collections';

const register = async (req: typeof request, res: typeof response) => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;
    const db = await Connection.getInstance();
    const userCollection = db.connection.db.collection(Collections.User);

    const validator = new UserValidator({
      username,
      password,
    });

    if (validator.isValid() && !(await validator.isExists())) {
      await userCollection.insertOne({ username, password });
      res.status(200).send('Success');
    } else {
      res.status(400).send('Invalid user!');
    }
  }
};

export default register;
