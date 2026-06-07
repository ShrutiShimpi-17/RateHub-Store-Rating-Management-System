const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Token is required."
    });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Token format is invalid. Must be 'Bearer <Token>'."
    });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.JWT_SECRET || 'ratehub_super_secret_session_token_key_2026', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token has expired or is invalid."
      });
    }
    
    // Assign user details to request object
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    };
    next();
  });
};

const hasRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. User authentication details missing."
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Access restricted. Required role: [${allowedRoles.join(', ')}].`
      });
    }
    
    next();
  };
};

module.exports = {
  verifyToken,
  hasRole
};
