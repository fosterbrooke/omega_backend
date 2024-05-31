const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

router.post("/signin", controller.signin);
router.post("/signup", controller.signup);

module.exports = router;
