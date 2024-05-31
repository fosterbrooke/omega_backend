const express = require("express");
const router = express.Router();

// Import auth routes
const authRoutes = require("./auth.route");

// Use the auth routes with /auth prefix
router.use("/auth", authRoutes);

// You can add more route files here in a similar way

module.exports = router;
