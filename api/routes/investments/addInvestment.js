const express = require("express");
const router = express.Router();
const { returnError, addReward, addInvestment } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { ChildId, Name, Points, Days, UserId } = req.body;
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
  if (!Days) {
    return await returnError(req, res, "Nem található napok");
  }

  const investment = await addInvestment(ChildId, Name, Points, Days, UserId);
  if (!investment) {
    return await returnError(req, res, "Hiba történt a létrehozás során");
  }
  if (investment == "NotEnoughPoints") {
    return await returnError(req, res, "Nincs elég pontod a befektetéshez");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen létrehoztál egy befektetést",
    investment,
  });
});

module.exports = router;
