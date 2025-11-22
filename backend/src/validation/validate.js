function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next({
        type: "validation",
        errors: err.issues || err.errors || [],
      });
    }
  };
}

module.exports = validate;
