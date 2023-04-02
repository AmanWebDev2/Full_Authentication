const express = require('express');
const router = express.Router();

const AppController = require('../../controllers/app-controller');
const { UserMiddleware } = require('../../middlewares/index');
const { registerMail } = require('../../services/email-service');
 
router.post('/register',UserMiddleware.validateRegisterUser,AppController.register);

// send the mail
router.post('/registerMail',registerMail)

router.get('/isAuthenticate',AppController.isAuthenticated)

router.post('/login',[UserMiddleware.validateLogin,UserMiddleware.verifyUser],AppController.login);

/** GET METHOD */
router.get('/user/:username',AppController.getUser);
router.get('/generateOTP',[UserMiddleware.verifyUser,UserMiddleware.localVariables],AppController.generateOTP);
router.get('/verifyOTP',UserMiddleware.verifyUser,AppController.verifyOTP);
router.get('/users',AppController.getUsers)
// reset all the variables
router.get('/createResetSession',AppController.createResetSession);

/** PUT METHOD */
router.put('/updateUser',UserMiddleware.Auth,AppController.updateUser);
router.put('/resetPassword',UserMiddleware.verifyUser,AppController.resetPassword);

 

module.exports = router;