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

describe("Delete a document", () => {
  it("delete", async (done) => {
    product.remove().then((prod) => {
      Product.findOne({ name: "apple" }).then((prod) => {
        assert(prod === null);
      });
    });
    done();
  });
});
