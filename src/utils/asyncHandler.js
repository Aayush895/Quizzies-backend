
const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(error.code || 500).send({
        status: false,
        message: error.message,
      });
    }
  };
};

export { asyncHandler };
