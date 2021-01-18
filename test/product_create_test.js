const assert = require("assert");

const Product = require("../models/Product");

describe("Create a product", () => {
  it("create", (done) => {
    const product = new Product({
      name: "apple",
      price: 10,
      quantity: 2,
      visible: true,
    });
    product.save().then(() => {
      assert(!product.isNew);
    });
    done();
  });
});
