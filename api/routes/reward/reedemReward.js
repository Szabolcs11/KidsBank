const express = require("express");
const router = express.Router();
const { returnError, reedemReward } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { RewardId } = req.body;
  if (!RewardId) {
    return await returnError(req, res, "Nem található jutalom");
  }

  const reward = await reedemReward(RewardId);
  if (!reward) {
    return await returnError(req, res, "Nem található jutalom");
  }
  if (reward == "NotEnoughPoints") {
    return await returnError(req, res, "Nincs elég pontod a jutalom beváltásához");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen beváltottad a jutalmat!",
  });
});

module.exports = router;
