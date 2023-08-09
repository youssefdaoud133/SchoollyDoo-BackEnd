const g = console.log;
const mongoose = require("mongoose");

const connect_to_database = () => {
  mongoose
    .connect(process.env.DB_LINKHOST)
    .then((conn) => {
      g(`sucessfully connected  ${conn.connection.host}`);
    })
    .catch((err) => {
      g(err.message);
    });
};

module.exports = connect_to_database;
