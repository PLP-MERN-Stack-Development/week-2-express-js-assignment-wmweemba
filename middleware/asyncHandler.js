//
//   asyncHandler
//   Wraps an asynchronous middleware or route handler function and ensures that any errors
//   are caught and passed to the next() middleware (typically the centralized error handler).
function asyncHandler(fn) {
  return (req, res, next) => {
    // Execute the async function and catch any errors, then pass them to next()
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;