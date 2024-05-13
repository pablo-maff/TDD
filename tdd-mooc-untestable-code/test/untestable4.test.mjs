import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(async () => {
    service = new PasswordService();

    await PostgresUserDao.getInstance().save({
      userId: 1,
      passwordHash: "asd"
    })
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("PasswordService fails to change password", async () => {
    expect(async () => await service.changePassword(1, "fds", "dsa")).to.throw
  });
});
