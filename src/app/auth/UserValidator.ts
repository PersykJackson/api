import UserConfig from '../configs/userConfig';

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
}

export default UserValidator;
