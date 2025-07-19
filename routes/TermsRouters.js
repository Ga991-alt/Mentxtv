const express = require("express");
const { getTerm, updateTerm } = require("../controllers/TermController.js");

const router = express.Router();

router.get("/", getTerm);
router.put("/", updateTerm);  // You can also use POST if you prefer

module.exports = router;
