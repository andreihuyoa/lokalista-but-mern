const authorizedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied." });
    }
    next();
  };
};

export default authorizedRoles;