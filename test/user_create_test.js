const assert = require("assert");

const User = require("../models/Purchase");

describe("Create a purchase", () => {
  it("create", (done) => {
    const user = new User({
      email: "bobicaleks@yahoo.com",
      password: "123456789",
    });
    user.save().then(() => {
      assert(!user.isNew);
    });
    done();
  });
});
