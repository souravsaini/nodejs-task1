const mongoose = require("mongoose");

module.exports = {
  connect: (cb) => {
    const url = `${process.env.MONGODB_URL}`;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", () => {
      console.error.bind(console, "MongoDB connection error.");
      return cb(false);
    });
    console.log("Database Connected!");
    return cb(true);
  },
};
