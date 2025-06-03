/**
 * auth middleware
 * 
 * This middleware checks the incoming request for an "Authorization" header.
 * If the header value matches the predefined token (MY_TOKEN), the request
 * is allowed to proceed to the next middleware or route handler.
 * Otherwise, it sends a 401 Unauthorized response.
 */

const MY_TOKEN = 'WSM_secret_key*#789)-+';

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Check if the header exists and begins with "Bearer "
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim(); // remove "Bearer " prefix
    if (token === MY_TOKEN) {
      return next();
    }
  }
  res.status(401).json({ message: 'Unauthorized' });
}

module.exports = auth;