const express = require("express");
const router = express.Router();
const { returnError, updateReward } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { Id, Name, Points, ChildId } = req.body;
  if (!Id) {
    return await returnError(req, res, "Nem található azonosító");
  }
  if (!Name) {
    return await returnError(req, res, "Nem található megnevezés");
  }
  if (!Points) {
    return await returnError(req, res, "Nem található pontszám");
  }
  if (!ChildId) {
    return await returnError(req, res, "Nem található kiválasztott gyermek");
  }

  const reward = await updateReward(Id, Name, Points, ChildId);
  if (!reward) {
    return await returnError(req, res, "Hiba történt a módosítás során");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen módosítottad a jutalmat",
    reward,
  });
});

module.exports = router;
