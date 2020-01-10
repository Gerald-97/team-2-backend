const express = require("express");
const router = express.Router();
const controllerx = require("../controllers/applicant/users");
const controllery = require("../controllers/applicant/applications");
const authorization = require("../middleware/token");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

router.post("/signup", controllerx.signup);
router.post("/login", controllerx.login);
router.get("/allUsers", controllerx.allUsers);
router.delete("/deleteuser/:id", controllerx.deleteUser);

router.post("/newApp", controllery.newApp);
router.get("/allApp", controllery.totalApp);
router.get("/oneApp/:id", controllery.seeApp);

module.exports = router;