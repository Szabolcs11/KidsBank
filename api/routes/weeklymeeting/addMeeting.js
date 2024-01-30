const express = require("express");
const router = express.Router();
const { returnError, addMeeting } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { Title, Text, Date, UserId } = req.body;
  if (!Title) {
    return await returnError(req, res, "Nem található cím");
  }
  if (!Text) {
    return await returnError(req, res, "Nem található szöveg");
  }
  if (!Date) {
    return await returnError(req, res, "Nem található dátum");
  }
  if (!UserId) {
    return await returnError(req, res, "Nem található userId");
  }

  const meeting = await addMeeting(Title, Text, Date, UserId);
  if (!meeting) {
    return await returnError(req, res, "Hiba történt a létrehozás során");
  }

  res.status(200).json({
    success: true,
    message: "Sikeresen létrehoztad a leírást",
    meeting,
  });
});

module.exports = router;
