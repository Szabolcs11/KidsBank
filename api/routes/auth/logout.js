const express = require("express");
const router = express.Router();
const { returnError, deleteUserSession } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  if (!req.cookies.sessiontoken) {
    return await returnError(req, res, "Nem vagy bejelentkezve");
  }

  let result = await deleteUserSession(req.cookies.sessiontoken);

  res.clearCookie("sessiontoken");
  return res.status(200).json({
    success: true,
    message: "Sikeres kijelentkezés",
  });
});

module.exports = router;
