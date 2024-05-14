import argon2 from "@node-rs/argon2";
import 'dotenv/config'

// * It is a singleton
// TODO 1: Encrypt password on save and store the password hash DONE
// TODO 2: Change it to just create one DONE
// TODO 3: Extract methods into their own class to comply with SRP
export class PostgresUserDao {
  constructor(db) {
    this.db = db
  }

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
  constructor(db) {
    this.users = db;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!this.users.verifyPassword(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = this.users.encryptPassword(newPassword);
    await this.users.save(user);
  }
}

export class PostgresService {

}
