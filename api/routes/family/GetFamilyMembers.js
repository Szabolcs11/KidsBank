const express = require("express");
const router = express.Router();
const { returnError, getFamilyChildren } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return await returnError(req, res, "Nem található userId");
  }

  const children = await getFamilyChildren(userId);
  if (!children) {
    return await returnError(req, res, "Hiba történt a lekérdezés során");
  }

  res.status(200).json({
    success: true,
    children,
  });
});

module.exports = router;
