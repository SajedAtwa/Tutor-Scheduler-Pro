// server/middlewares/roleMiddleware.js
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is the decoded JWT (set by authMiddleware)
    const role =
      req.user?.customer?.role ||
      req.user?.provider?.role ||
      req.user?.role;

    if (!role) {
      return res.status(403).json({ message: "Forbidden: role not found on token." });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions." });
    }

    next();
  };
};