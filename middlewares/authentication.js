const jwt = require("jsonwebtoken");

const tokenVerification = (req, res, next) => {
  const token = req.get("token");

  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }

    req.user = decoded.user;
    next();
  });
};

module.exports = {
  tokenVerification
};
