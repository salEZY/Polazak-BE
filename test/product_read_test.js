const assert = require("assert");

const Product = require("../models/Product");

let product;
beforeEach((done) => {
  product = new Product({
    name: "apple",
    price: 10,
    quantity: 2,
    visible: true,
  });
  product.save();
  done();
});

describe("Read a document", () => {
  it("read", async (done) => {
    Product.findOne({ name: "apple" }).then((prod) => {
      assert(prod.name === "apple");
    });
    done();
  });
});
