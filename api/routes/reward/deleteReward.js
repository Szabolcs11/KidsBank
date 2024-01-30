const express = require("express");
const router = express.Router();
const { returnError, deleteReward } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { RewardId } = req.body;
  if (!RewardId) {
    return await returnError(req, res, "Nem található jutalom");
  }

  const deleted = await deleteReward(RewardId);
  if (!deleted) {
    return await returnError(req, res, "Hiba történt a törlés során");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen törölted a jutalmat",
  });
});

module.exports = router;
