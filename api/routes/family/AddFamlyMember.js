const express = require("express");
const router = express.Router();
const { returnError, createFamilyMember } = require("../../modules/utils/index.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  const { nickname, birthDate, points, userId } = req.body;
  if (!nickname) {
    return await returnError(req, res, "Nem adtál meg nevet");
  }
  if (!birthDate) {
    return await returnError(req, res, "Nem adtál meg jelszót");
  }
  if (!points) {
    return await returnError(req, res, "Nem adtál meg pontot");
  }
  if (!userId) {
    return await returnError(req, res, "Nem található userId");
  }

  const child = await createFamilyMember(nickname, birthDate, points, userId);
  if (!child) {
    return await returnError(req, res, "Nem sikerült a regisztráció");
  }

  res.status(200).json({
    success: true,
    message: "Sikeres hozzáadás",
    child,
  });
});

module.exports = router;
