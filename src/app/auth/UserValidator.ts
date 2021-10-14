import { Collection } from 'mongodb/mongodb.ts34';
import UserConfig from '../configs/userConfig';

class UserValidator {
  private readonly username: string;

  private readonly password: string;

  private userCollection: Collection;

  constructor({
    username,
    password,
    userCollection,
  }: {
    username: string;
    password: string;
    userCollection: Collection;
  }) {
    this.username = username;
    this.password = password;
    this.userCollection = userCollection;
  }

  public async isValid(): Promise<boolean> {
    const user = await this.userCollection.findOne({ username: this.username });

    if (this.username.length < UserConfig.usernameLength) {
      return false;
    }

    if (this.password.length < UserConfig.passwordLength) {
      return false;
    }

    return !user;
  }
}

export default UserValidator;
