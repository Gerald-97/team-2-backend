const express = require("express");
const router = express.Router();
const controllery = require("../controllers/applicant/applications");
const auth = require("../middleware/token");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Express"
    });
});

router.get("/allApp", auth, controllery.totalApp);
router.post("/newApp", auth, controllery.newApp);
router.get("/oneApp/:id", controllery.seeApp);


module.exports = router;