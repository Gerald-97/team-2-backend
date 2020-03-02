const express = require("express");
const router = express.Router();
const adminCon = require("../controllers/admin/adminControl");

router.post("/signup", adminCon.adminReg);
router.post("/login", adminCon.adminLogin);
router.get("/:id", adminCon.oneAdmin);

module.exports = router;