import argon2 from "@node-rs/argon2";
import pg from "pg";
import 'dotenv/config'

// * It is a singleton
// TODO 1: Encrypt password on save and store the password hash DONE
// TODO 2: Change it to just create one
export class PostgresUserDao {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  close() {
    this.db.end();
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }

  encryptPassword(password) {
    return argon2.hashSync(password)
  }

  verifyPassword(passwordHash, password) {
    return argon2.verifySync(passwordHash, password)
  }

  async deleteAll() {
    await this.db.query(`
      delete from users
    `)
  }
}

export class PasswordService {
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!this.users.verifyPassword(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = this.users.encryptPassword(newPassword);
    await this.users.save(user);
  }
}
