const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllers/authController");
const { validateJwt, revalitdateJwt } = require("../middlewares/processJwt");

router.post("/login", userLogin);

router.post("/renew", validateJwt, revalitdateJwt);

module.exports = router;
