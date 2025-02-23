const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).reject((err) => next(err));
  };
};

export { asyncHandler };

/*
--> Other way of doing this:

const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};



-> How to write this higher order function :

const asyncHandler = () => {}
const asyncHnadler = (func) => () => {}
const asyncHandler = (func) => async () => {}

*/
