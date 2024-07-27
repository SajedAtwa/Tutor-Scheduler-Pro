const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization); // Add this line
  let token;

  // Log environment variable (ensure to remove this after debugging)
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  // Check if an authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Try to extract and verify the token
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract the token from the header
      console.log('Token:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = decoded; // Attach user data to the request object
      console.log('Decoded JWT:', req.user);  // Log decoded token for debugging

      next(); // Proceed to the next middleware
    } catch (error) {
      // Handle errors related to token verification (such as expiration or tampering)
      console.error('Not authorized, token failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
  } else {
    // Handle cases where no token is present
    console.error('No token provided, authorization denied');
    res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

module.exports = authMiddleware;

