const g = console.log;
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bodyParser = require("body-parser");

const cors = require("cors");
// require ApiClassError
const ApiClassError = require("./utils/ApiClassError");
// require global_middleware_to_handle_error
const global_middleware_to_handle_error = require("./middlewares/global_middleware_to_handle_error");

// require all routes
const UserRoute = require("./routes/UsersRoute");
const AuthRoute = require("./routes/AuthRoute");
const SchoolRoute = require("./routes/SchoolRoute");
const NotificationRoute = require("./routes/NotificationRoute");
const ApplyRoute = require("./routes/ApplyRoute");
const PostRoute = require("./routes/PostRoute");
const GenerateSchedules = require("./routes/GenerateSchedules");

// connect to database
const dbconnect = require("./config/database");
dbconnect();
//// Your API routes and other server code
app.use(cors({ origin: "*" }));
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// amount routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/Schools", SchoolRoute);
app.use("/api/v1/Notifications", NotificationRoute);
app.use("/api/v1/Applies", ApplyRoute);
app.use("/api/v1/Posts", PostRoute);
app.use("/api/v1/GenerateSchedules", GenerateSchedules);

// handle all routers errors
app.all("*", (req, res, next) => {
  // const error = new Error("your path is invailed " + req.originalUrl);
  next(new ApiClassError("your path is invailed", 400));
});

// global_middleware_to handle_error
app.use(global_middleware_to_handle_error);

// intialize port
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  g(`start server on port ${PORT}`);
});
