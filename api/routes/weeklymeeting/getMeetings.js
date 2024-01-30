const express = require("express");
const router = express.Router();
const { returnError, getMeetings } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    return await returnError(req, res, "Nem található userId");
  }

  const meetings = await getMeetings(UserId);
  if (!meetings) {
    return await returnError(req, res, "Hiba történt a lekérdezés során");
  }

  res.status(200).json({
    success: true,
    meetings,
  });
});

module.exports = router;
