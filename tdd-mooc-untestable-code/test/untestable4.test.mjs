import { afterAll, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  let service;
  let users = PostgresUserDao.getInstance();
  let user;
  beforeEach(async () => {
    service = new PasswordService();
    await users.deleteAll()

    user = await users.getById(1)

    if (!user) {
      await users.save({
        userId: 1,
        passwordHash: users.encryptPassword("asd")
      })

      user = await users.getById(1)
    }
  });

  afterAll(() => {
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
