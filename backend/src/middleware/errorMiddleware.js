function errorMiddleware(err, req, res, next) {
  console.error(err);

  // Prisma errors
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      error: "Database error",
      message: err.message,
    });
  }

  // Validation errors
  if (err.type === "validation") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors,
    });
  }

  // Other errors
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: err.message,
  });
}

module.exports = errorMiddleware;
