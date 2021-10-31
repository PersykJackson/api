import { Collection } from 'mongodb/mongodb.ts34';
import mongoose from 'mongoose';
import { Document } from 'bson';
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

  public async findUser(username: string): Promise<Document> {
    return this.userCollection.findOne({ username });
  }
}

export default User;
