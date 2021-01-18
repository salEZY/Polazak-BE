const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const connect = require("./util/connectMongo");

connect();

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

// Homepage
app.get("/", (req, res) => {
  res.send("Welcome to our Basic Shop");
});

// User routes
app.use("/api/user", require("./routes/users"));
// Product routes
app.use("/api/product", require("./routes/product"));
// Shop-n-Cart routes
app.use("/api/shop-n-cart", require("./routes/shopCart"));

// Server start
app.listen(PORT, () => {
  console.log(`Basic Shop server started at port ${PORT}`);
});
