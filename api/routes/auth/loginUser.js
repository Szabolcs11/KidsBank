const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const conn = require("../../modules/mysql/index.js");
const { returnError, createUser, loginUser } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (req.cookies.sessiontoken) {
    return await returnError(req, res, "Már be vagy jelentkezve");
  }
  if (!username) {
    return await returnError(req, res, "Nem adtál meg felhasználónevet");
  }
  if (!password) {
    return await returnError(req, res, "Nem adtál meg jelszót");
  }

  const dbres = await loginUser(username, password);
  if (dbres == "UserNotFound") {
    return await returnError(req, res, "Nincs ilyen felhasználó");
  }
  if (dbres == "InvalidPass") {
    return await returnError(req, res, "Hibás jelszó");
  }

  res
    .cookie("sessiontoken", dbres.token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json({
      success: true,
      message: "Sikeres bejelentkezés",
      user: dbres.user,
    });
});

module.exports = router;
