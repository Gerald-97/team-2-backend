const express = require("express");
const router = express.Router();
const adminCon = require("../controllers/admin/adminControl");
const appCreate = require("../controllers/admin/appCreate")
const assCreate = require("../controllers/admin/assessment")
const auth = require("../middleware/token");

router.post("/signup", adminCon.adminReg);
router.post("/login", adminCon.adminLogin);

router.get("/all-test", assCreate.AssessmentDisplay);
router.post("/test", auth, assCreate.AssessmentEntry);
router.put("/test/:id", assCreate.AssessmentUpdate);
router.get("/one-test/:id", assCreate.AssessmentDisplayOne);

router.post("/new", appCreate.ApplicantEntry);
router.get("/all", auth, appCreate.ApplicantDisplay);
router.get("/:id", appCreate.ApplicantDisplayOne);
router.put("/edit/:id", auth, appCreate.ApplicantUpdate);
router.delete("/del/:id", auth, appCreate.ApplicantDelete);


module.exports = router;