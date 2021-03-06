const express = require("express");
const router = express.Router();
// const adminCon = require("../controllers/admin/adminControl");
// const appCreate = require("../controllers/admin/appCreate")
const assCreate = require("../controllers/admin/assessment")
const auth = require("../middleware/token");
const test = require("../controllers/admin/scoring")

router.get("/all-test", auth, assCreate.AssessmentDisplay);
router.post("/calc-test", auth, test.calcAns);
router.get("/scores", auth, test.getScores)
router.post("/test", auth, assCreate.AssessmentEntry);
router.get("/one-test/:id", assCreate.AssessmentDisplayOne);
router.put("/test/:id", assCreate.AssessmentUpdate);

module.exports = router;