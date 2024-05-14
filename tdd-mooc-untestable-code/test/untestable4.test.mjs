import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  let service;
  let user;
  beforeEach(async () => {
    service = new PasswordService();
    await PostgresUserDao.getInstance().deleteAll()

    await PostgresUserDao.getInstance().save({
      userId: 1,
      passwordHash: "asd"
    })

    user = await PostgresUserDao.getInstance().getById(1)
  });

  afterAll(() => {
    PostgresUserDao.getInstance().close();
  });

  test("PasswordService fails to change password", async () => {
    expect(async () => await service.changePassword(user.userId, "fds", "dsa")).to.throw
  });

  test.skip("PasswordService changes password", async () => {
    await service.changePassword(1, "asd", "dsa")

    const updatedUser = await PostgresUserDao.getInstance().getById(1)

    expect(updatedUser.passwordHash).to.not.equal(user.passwordHash)
  });
});
