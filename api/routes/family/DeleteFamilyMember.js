const express = require("express");
const router = express.Router();
const { returnError, deleteChild } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { ChildId } = req.body;
  if (!ChildId) {
    return await returnError(req, res, "Nem található ChildId");
  }

  const deleted = await deleteChild(ChildId);
  if (!deleted) {
    return await returnError(req, res, "Hiba történt a törlés folyamán");
  }

  res.status(200).json({
    success: true,
    message: "Sikeres törlés",
  });
});

module.exports = router;
