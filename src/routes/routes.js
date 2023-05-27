const { Router } = require('express');
const authController = require('../controllers/authController.js');
const checkAuth = require('../middlewares/checkAuth.js');

const router = Router();

router.get('/', authController.loginPage);
router.post('/', authController.loginPost);
router.get('/logout', authController.logout);

router.get('/register', authController.registerPage);
router.post('/register', authController.registerPost)

router.get('/home', checkAuth,authController.homePage);

router.get('/about', authController.about);

module.exports = router;