const jwt = require("jsonwebtoken");


const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Acesso negado. Token não fornecido.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Token inválido.");
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
