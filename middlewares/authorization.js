const adminVerification = (req, res, next) => {
  const role = req.user.role;

  if (!req || role !== "ADMIN_ROLE") {
    return res.status(401).json({
      ok: false,
      err: {
        message: "Unauthorized"
      }
    });
  }
  next();
};

module.exports = {
  adminVerification
};
