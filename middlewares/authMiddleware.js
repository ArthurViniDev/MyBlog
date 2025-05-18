const jwt = require("jsonwebtoken");
const secret = "Segredo";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) return res.status(401).json({
    error: 'Access denied, token not found',
  })
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).json({error: 'Invalid token'});

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;