const bcrypt = require("bcryptjs");
const { generateJwt } = require("../middlewares/processJwt");

const User = require("../models/user");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userToLogin = await User.findOne({ email });
  if (!userToLogin) {
    return res.status(400).json({ message: "Admin login only" });
  }
  const validPassword = bcrypt.compareSync(password, userToLogin.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Incorrect Password" });
  }
  const token = await generateJwt(userToLogin._id);
  return res.json({ user: userToLogin, token });
};

module.exports = {
  userLogin,
};
