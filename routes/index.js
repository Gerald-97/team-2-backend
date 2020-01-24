const express = require("express");
const router = express.Router();
const controllerx = require("../controllers/applicant/users");
// const controllery = require("../controllers/applicant/applications");
// const auth = require("../middleware/token");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

router.post("/signup", controllerx.signup);
router.get("/allUsers", controllerx.allUsers);
router.post("/login", controllerx.login);
router.get("/:id", controllerx.oneUser);

// router.get("/allApp", auth, controllery.totalApp);
// router.post("/newApp", auth, controllery.newApp);
router.delete("/deleteuser/:id", controllerx.deleteUser);
// router.get("/oneApp/:id", controllery.seeApp);


module.exports = router;