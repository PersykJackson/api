import { request, response } from 'express';
import bcrypt from 'bcrypt';
import UserValidator from '../app/auth/UserValidator';
import Connection from '../app/database/Сonnection';
import Collections from '../app/types/collections';
import User from '../app/models/User';

const registration = async (
  req: typeof request,
  res: typeof response
): Promise<void> => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;
    const db = await Connection.getInstance();
    const userCollection = db.connection.db.collection(Collections.User);

    const validator = new UserValidator({
      username,
      password,
    });
    const userModel = new User(await Connection.getInstance());

    if (!validator.isValid()) {
      res.status(400).json('Invalid user!');
      return;
    }

    if (await userModel.isUserExists(username)) {
      res.status(400).json('User already exists!');
      return;
    }

    const salt = bcrypt.genSaltSync(Number(process.env.PASSWORD_STRONG));
    const hash = bcrypt.hashSync(password, salt);
    const result = await userCollection.insertOne({ username, password: hash });

    if (result) {
      res.status(200).json('Success!');
    } else {
      res.status(520).json('Database error!');
    }
  }
};

export default registration;
