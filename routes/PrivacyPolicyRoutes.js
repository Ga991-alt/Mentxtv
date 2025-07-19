const express = require("express");
const { getPrivate, updatePrivate } = require("../controllers/PrivacyPolicyController.js");

const router = express.Router();

router.get("/", getPrivate);
router.put("/", updatePrivate);  // You can also use POST if you prefer

module.exports = router;
