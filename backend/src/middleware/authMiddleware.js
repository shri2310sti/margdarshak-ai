const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "margdarshak_jwt_secret_change_in_production";

// Strict — blocks request if no valid token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Not authorized. Please sign in." });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// Optional — sets req.userId if token present, continues either way
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id;
    } catch {
      req.userId = null;
    }
  } else {
    req.userId = null;
  }
  next();
};

module.exports = { protect, optionalAuth };
