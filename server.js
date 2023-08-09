const g = console.log;
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
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

// connect to database
const dbconnect = require("./config/database");
dbconnect();
//// Your API routes and other server code
app.use(cors({ origin: "*" }));

app.use(express.json());

// amount routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/Schools", SchoolRoute);
app.use("/api/v1/Notifications", NotificationRoute);
app.use("/api/v1/Applies", ApplyRoute);

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
