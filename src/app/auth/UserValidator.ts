import UserConfig from '../configs/userConfig';
import Connection from '../database/Сonnection';
import Collections from '../types/collections';

class UserValidator {
  private readonly username: string;

  private readonly password: string;

  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }

  public isValid(): boolean {
    if (this.username.length < UserConfig.usernameLength) {
      return false;
    } else if (this.password.length < UserConfig.passwordLength) {
      return false;
    }

    return true;
  }

  public async isExists(): Promise<boolean> {
    const db = await Connection.getInstance();
    const userCollection = db.connection.db.collection(Collections.User);

    return !!(await userCollection.findOne({
      username: this.username,
      password: this.password,
    }));
  }
}

export default UserValidator;
