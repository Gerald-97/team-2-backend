const express = require('express');
const router = express.Router();
const controllerx = require('../controllers/users');
const controllery = require('../controllers/applications');
const authorization = require('../middleware/token');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/signup', controllerx.signup);
router.post('/login', controllerx.login);
router.get('/allUsers', controllerx.allUsers);
router.delete('/deleteuser/:id', controllerx.deleteUser)


router.post('/newApp', controllery.newApp);
router.get('/allApp', controllery.allApp);

module.exports = router;