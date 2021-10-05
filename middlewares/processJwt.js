const jwt = require("jsonwebtoken");

const User = require("../models/user");

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const date = { uid: id };
    jwt.sign(
      data,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateJwt = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ message: "Token not found" });
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(uid);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const revalitdateJwt = async (req, res, next) => {
  const user = req.user;
  const token = await generateJwt(user._id);
  try {
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res) => {
  if (!req.user) {
    return res.status(500).json({ message: "Need validation First" });
  }
  const { role, name } = req.user;
  if (role !== "ADMIN") {
    return res.status(401).json({
      message: `User ${name} is not Admin`,
    });
  }
  next();
};

module.exports = {
  generateJwt,
  validateJwt,
  revalitdateJwt,
  isAdmin,
};
