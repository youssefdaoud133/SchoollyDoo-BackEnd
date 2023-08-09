const global_middleware_to_handle_error = (Error, req, res, next) => {
  Error.statuscode = Error.statuscode || 500;
  Error.status = Error.status || "Error";

  res.status(Error.statuscode).json({
    statuscode: Error.statuscode,
    status: Error.status,
    message: Error.message,
    stack: Error.stack,
  });
};

module.exports = global_middleware_to_handle_error;
