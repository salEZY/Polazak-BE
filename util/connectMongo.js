const mongoose = require("mongoose");
// In production user, password and dbname would be hidden!
const URI =
  "mongodb+srv://salezy:salezy@polazak-db.lxiad.mongodb.net/db?retryWrites=true&w=majority?authSource=yourDB&w=1";

const connect = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connect;
