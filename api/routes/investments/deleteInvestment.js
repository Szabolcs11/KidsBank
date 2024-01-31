const express = require("express");
const router = express.Router();
const { returnError, deleteInvestment } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { InvestmentId } = req.body;
  if (!InvestmentId) {
    return await returnError(req, res, "Nem található Id");
  }

  const investments = await deleteInvestment(InvestmentId);
  if (!investments) {
    return await returnError(req, res, "Hiba történt a lekérdezés során");
  }

  res.status(200).json({
    success: true,
    message: "Sikeres törölted a befektetést",
    investments,
  });
});

module.exports = router;
