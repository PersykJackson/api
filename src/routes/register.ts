import { request, response } from 'express';
import { Collection } from 'mongodb/mongodb.ts34';
import UserValidator from '../app/auth/UserValidator';
import Connection from '../app/database/Сonnection';

const register = async (req: typeof request, res: typeof response) => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;
    const db = await Connection.getInstance();
    const userCollection = db.connection.db.collection('User');

    const validator = new UserValidator({
      username,
      password,
      userCollection: userCollection as unknown as Collection,
    });

    if (await validator.isValid()) {
      await userCollection.insertOne({ username, password });
      res.status(200).send('Success');
    } else {
      res.status(400).send('Invalid user!');
    }
  }
};

export default register;
