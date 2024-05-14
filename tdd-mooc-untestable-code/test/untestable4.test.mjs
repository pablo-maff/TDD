import { afterEach, beforeEach, describe, test } from "vitest";
import { Argon2Hasher, PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";
import pg from "pg";

describe("Untestable 4: enterprise application", () => {
  let service;
  let user;
  let users;
  let hasher;
  beforeEach(async () => {
    users = new PostgresUserDao(new pg.Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    }))

    hasher = new Argon2Hasher()

    service = new PasswordService(users, hasher);

    await users.deleteAll()

    await users.save({
      userId: 1,
      passwordHash: hasher.encryptPassword("asd")
    })

    user = await users.getById(1)
  });

  afterEach(() => {
    users.close();
  });

  test("PasswordService fails to change password", async () => {
    expect(async () => await service.changePassword(user.userId, "fds", "dsa")).rejects.toThrowError("wrong old password")
  });

  test("PasswordService changes password", async () => {
    await service.changePassword(1, "asd", "dsa")

    const updatedUser = await users.getById(1)

    expect(updatedUser.passwordHash).to.not.equal(user.passwordHash)
  });
});
