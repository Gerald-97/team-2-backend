const express = require("express");
const router = express.Router();
const appCreate = require("../controllers/admin/appCreate")
const auth = require("../middleware/token");

router.post("/new", appCreate.ApplicantEntry);
router.get("/all", auth, appCreate.ApplicantDisplay);
router.get("/:id", appCreate.ApplicantDisplayOne);
router.put("/edit/:id", auth, appCreate.ApplicantUpdate);
router.delete("/del/:id", auth, appCreate.ApplicantDelete);


module.exports = router;