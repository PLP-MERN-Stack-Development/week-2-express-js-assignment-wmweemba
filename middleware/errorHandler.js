
 // errorHandler middleware
 // This middleware function handles errors that occur in the application.
 // When an error is thrown in any async or sync route handler, it is passed
 // to this centralized error handler using next(err).
 // It logs the full error stack to the console and sends a JSON response
  
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;