const assert = require("assert");

const Purchase = require("../models/Purchase");

describe("Create a purchase", () => {
  it("create", (done) => {
    const purchase = new Purchase({
      name: "apple",
      price: 10,
      quantity: 2,
      creator: "sale",
    });
    purchase.save().then(() => {
      assert(!purchase.isNew);
    });
    done();
  });
});
