const express = require("express");
const router = express.Router();
const { returnError, updateChild } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { ChildId, Nickname, BirthDate, Points } = req.body;
  if (!Nickname) {
    return await returnError(req, res, "Nem található Nickname");
  }
  if (!BirthDate) {
    return await returnError(req, res, "Nem található BirthDate");
  }
  if (!Points) {
    return await returnError(req, res, "Nem található Points");
  }
  if (!ChildId) {
    return await returnError(req, res, "Nem található ChildId");
  }

  const updated = await updateChild(ChildId, Nickname, Points, BirthDate);
  if (!updated) {
    return await returnError(req, res, "Hiba történt a módosítás folyamán");
  }

  res.status(200).json({
    success: true,
    message: "Sikeres módosítás",
  });
});

module.exports = router;
