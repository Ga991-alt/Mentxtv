const express = require("express");
const { getSocial, updateSocial } = require("../controllers/SocialController.js");

const router = express.Router();

router.get("/", getSocial);
router.put("/", updateSocial);  // You can also use POST if you prefer

module.exports = router;
