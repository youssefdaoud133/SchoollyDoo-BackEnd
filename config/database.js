const g = console.log;
const mongoose = require("mongoose");

const connect_to_database = () => {
  mongoose
    .connect(process.env.DB_LINKHOST)
    .then((conn) => {
      g(`sucessfully connected  ${conn.connection.host}`);
    })
    .catch((err) => {
      g(err);
    });
};

module.exports = connect_to_database;

// const mongoose = require("mongoose");
// const connect_to_database = () => {
//   // Replace 'your-database-uri' with your actual MongoDB database URI
//   const databaseUri = "mongodb://127.0.0.1:27017/SchoollyDoo";

//   try {
//     mongoose.connect(databaseUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const db = mongoose.connection;

//     db.on("error", console.error.bind(console, "MongoDB connection error:"));
//     db.once("open", () => {
//       console.log("Connected to MongoDB database");
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = connect_to_database;
