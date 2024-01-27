const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const conn = require("../../modules/mysql/index.js");
const { returnError, createUser, loginUser } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { username, email, password, passwordagain } = req.body;
  if (req.cookies.sessiontoken) {
    return await returnError(req, res, "Már be vagy jelentkezve");
  }
  if (!username) {
    return await returnError(req, res, "Nem adtál meg felhasználónevet");
  }
  if (!email) {
    return await returnError(req, res, "Nem adtál meg emailcímet");
  }
  if (!password) {
    return await returnError(req, res, "Nem adtál meg jelszót");
  }
  if (!passwordagain) {
    return await returnError(req, res, "Nem adtál meg jelszót");
  }
  if (password != passwordagain) {
    return await returnError(req, res, "A jelszavak nem egyeznek");
  }

  const userID = await createUser(username, email, password);
  if (userID == "UserAlreadyExists") {
    return await returnError(req, res, "Már van ilyen felhasználónév");
  }
  if (userID == "DBError") {
    return await returnError(req, res, "Adatbázis hiba történt");
  }

  return res.status(200).json({
    success: true,
    message: "Sikeres regisztráció",
    userID,
  });
});

module.exports = router;
