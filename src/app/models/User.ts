import { Collection } from 'mongodb/mongodb.ts34';
import mongoose from 'mongoose';
import Collections from '../types/collections';

class User {
  private userCollection: Collection<Document>;

  constructor(db: typeof mongoose) {
    this.userCollection = db.connection.db.collection(
      Collections.User
    ) as unknown as Collection<Document>;
  }

  public async isUserExists(username: string): Promise<boolean> {
    return !!(await this.userCollection.findOne({ username }));
  }

  public async isCorrectPassword(user: {
    username: string;
    password: string;
  }): Promise<boolean> {
    return !!(await this.userCollection.findOne(user));
  }
}

export default User;
