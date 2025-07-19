const express = require("express");
const { getAboutUs, updateAboutUs } = require("../controllers/aboutUsController");

const router = express.Router();

router.get("/", getAboutUs);
router.put("/", updateAboutUs);

module.exports = router;
