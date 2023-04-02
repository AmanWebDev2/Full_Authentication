const express = require('express');
const router = express.Router();

const AppController = require('../../controllers/app-controller');
const { UserMiddleware } = require('../../middlewares/index');
 
router.post('/register',UserMiddleware.validateRegisterUser,AppController.register);

// send the mail
router.post('/registerMail',(req,res)=>{
    res.status(200).json('register mail router')
})

router.get('/isAuthenticate',AppController.isAuthenticated)

router.post('/login',[UserMiddleware.validateLogin,UserMiddleware.verifyUser],AppController.login);

/** GET METHOD */
router.get('/user/:username',AppController.getUser);
router.get('/generateOTP',[UserMiddleware.verifyUser,UserMiddleware.localVariables],AppController.generateOTP);
router.get('/verifyOTP',AppController.verifyOTP);
router.get('/users',AppController.getUsers)
// reset all the variables
router.get('/createResetSession',AppController.createResetSession);

/** PUT METHOD */
router.put('/updateUser',UserMiddleware.Auth,AppController.updateUser);
router.put('/resetPassword',AppController.resetPassword);

 

module.exports = router;