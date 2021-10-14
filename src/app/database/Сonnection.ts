import mongoose from 'mongoose';

class Connection {
  private static instance: null | Promise<typeof mongoose>;

  public static getInstance(): Promise<typeof mongoose> {
    if (!this.instance) {
      this.instance = mongoose.connect(
        process.env.DB_LINK.replace('user_name', process.env.DB_USER).replace(
          'password',
          process.env.DB_PASSWORD
        )
      );
    }

    return this.instance;
  }
}

export default Connection;
