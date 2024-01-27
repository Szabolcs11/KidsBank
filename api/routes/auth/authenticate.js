const express = require("express");
const { Authenticate } = require("../../modules/utils");
const router = express.Router();

router.use(Authenticate);
router.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
