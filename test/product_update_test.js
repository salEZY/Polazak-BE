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

describe("Update a document", () => {
  it("update", async (done) => {
    Product.findOne({ name: "apple" }).then((prod) => {
      prod.name === "banana";
      prod.save().then((prod) => {
        assert(prod.name === "banana");
      });
    });
    done();
  });
});
