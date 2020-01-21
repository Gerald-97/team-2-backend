const express = require("express");
const router = express.Router();
// const adminCon = require("../controllers/admin/adminControl");
// const appCreate = require("../controllers/admin/appCreate")
const assCreate = require("../controllers/admin/assessment")
const auth = require("../middleware/token");

router.get("/all-test", auth, assCreate.AssessmentDisplay);
router.post("/test", auth, assCreate.AssessmentEntry);
router.put("/test/:id", assCreate.AssessmentUpdate);
router.get("/one-test/:id", assCreate.AssessmentDisplayOne);

module.exports = router;