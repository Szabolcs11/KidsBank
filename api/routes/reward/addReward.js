const express = require("express");
const router = express.Router();
const { returnError, addReward } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { Name, Points, UserId, ChildId } = req.body;
  if (!Name) {
    return await returnError(req, res, "Nem található megnevezés");
  }
  if (!Points) {
    return await returnError(req, res, "Nem található pontszám");
  }
  if (!ChildId) {
    return await returnError(req, res, "Nem található kiválasztott gyermek");
  }
  if (!UserId) {
    return await returnError(req, res, "Nem található userId");
  }

  const reward = await addReward(Name, Points, UserId, ChildId);
  if (!reward) {
    return await returnError(req, res, "Hiba történt a létrehozás során");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen módosítottad a jutalmat",
    reward,
  });
});

module.exports = router;
