const express = require("express");
const router = express.Router();
const adminCon = require("../controllers/admin/adminControl");
const appCreate = require("../controllers/admin/appCreate")
const assCreate = require("../controllers/admin/assessment")
const authorization = require("../middleware/token");

router.post("/signup", adminCon.adminReg);
router.post("/login", adminCon.adminLogin);

router.post("/new", appCreate.ApplicantEntry);
router.get("/all", appCreate.ApplicantDisplay);
router.get("/:id", appCreate.ApplicantDisplayOne);
router.put("/edit/:id", appCreate.ApplicantUpdate);
router.delete("/del/:id", appCreate.ApplicantDelete)

router.post("/test", assCreate.AssessmentEntry);
router.put("/test/:id", assCreate.AssessmentUpdate);
router.get("/all-test", assCreate.AssessmentDisplay);
router.get("/one-test", assCreate.AssessmentDisplayOne);

module.exports = router;