const Routes = require("./index");
const express = require("express");
const router = express.Router();
router.use("/v1", Routes.UserRoutes);

module.exports = router;
