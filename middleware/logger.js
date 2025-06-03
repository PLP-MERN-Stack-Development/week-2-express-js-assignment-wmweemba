// logger middleware
// Logs the HTTP method and URL of each incoming request.
// This middleware is useful for debugging and monitoring incoming traffic.

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = logger;