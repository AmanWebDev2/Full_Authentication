const { UserService } = require('../services/index');
/**
 * 
 * @param {
 *  "username": "example123",
 *  "password": "admin@123",
 *   "email": "amanrawat.ar321@gmail.com",
 *   "profile": "",
 *   "firstName": "bill",
 *   "lastName":"william",
 *   "mobile": "",
 *   "address": "",
    }
 */
const register = async(req,res) => {
    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            profile: req.body.profile
        } 
        const resp = await UserService.registerUser(data);
        return res.status(200).json({
            data:{username:resp},
            success: true,
            message: 'successfully register the user',
            err:{ },
        }) 
    } catch (error) {
        return res.status(500).json({
            data:[],
            success: false,
            message: 'unable to register the user',
            err:error,
        })
    }
}

/**
 * 
 * @param {
 *  "username": "",
 *  "password": ""
 * } 
 */
const login = async(req,res) =>{
    try {
    const { username, password } = req.body;
    const response = await UserService.login(username,password);
       return res.status(200).json({
            data:response,
            success: true,
            message: 'successfully login',
            err:{},
        }) 
    } catch (error) {
        return res.status(500).json({
            data:[],
            success: false,
            message: 'unable to login',
            err:error,
        })
    }
}

const isAuthenticated=async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await UserService.isAuthenticate(token);
        return res.status(200).json({
            data:response,
            success: true,
            message: 'successfully authenticated',
            err: {},
        })
    } catch (error) {
        return res.status(500).json({
            data:[],
            success: false,
            message: 'unable to authenticate',
            err:error,
        }) 
    }
}

// http://localhost:8080/user/<username>
const getUser=async(req,res)=>{
    try {
        const {username} = req.params;
        const user = await UserService.getUser(username); 
        return res.status(200).json({
            data:user,
            success: true,
            message: 'successfully fetched the user',
            err: {}
        });
    } catch (error) {
        const {statusCode,...rest} = error;
        return res.status(statusCode ? statusCode: 500).json({
            data:[],
            success: false,
            message: 'unable to get the user',
            err:rest,
        }) 
    }
}

const getUsers=async(req,res)=>{
    try {
        console.log("working")
        const users = await UserService.getUsers();
        return res.status(200).json({
            data:users,
            success: true,
            message: 'successfully fetched all the user',
            err:error,
        }) 
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to fetched the user',
            err:error,
        }) 
    }
}

// PUT
/**
 @param {
    "id": <user_id>
    "body": {
        "firstName": "",
        "lastName": "",
        ...
    }
} 
 */
const updateUser =async(req,res)=>{
    try {
        const { id }  = req.user;
        const data = req.body;
        const resp = await UserService.update(id,data);
        return res.status(200).json({
            data: resp,
            success: true,
            message: 'successfully update a user',
            err: {}
        });
    } catch (error) {
        const { statusCode, ...rest } = error
        res.status(statusCode?statusCode:500).json({
            data:[],
            success: false,
            message: 'unable to update the user',
            err:rest,
        }) 
    }
}

// GET - http://localhost:8080/api/v1/generateOTP
const generateOTP=async(req,res)=>{
    try {
        req.app.locals.OTP = await UserService.generateOTP();
        return res.status(201).json({
            data:req.app.locals.OTP,
            success: true,
            message: 'successfullu generated the OTP',
            err:{},
        }) 
    } catch (error) {
        return res.status(500).json({
            data:[],
            success: false,
            message: 'unable to generate the OTP',
            err:error,
        }) 
    }
}

// GET - http://localhost:8080/api/v1/verifyOTP
const verifyOTP=async(req,res)=>{
    try {
        const { code } = req.query;
        if(!code) throw new Error('missong OTP')
        if(parseInt(code) === parseInt(req.app.locals.OTP)) {
            req.app.locals.OTP = null; // reset otp
            req.app.locals.resetSession = null; // start session for reset passwod
        }else {
            throw {error: 'invalid OTP'}
        }
        return res.status(200).json({
            data:[],
            success: true,
            message: 'successfully verify the OTP',
            err:{ },
        }) 
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to verify the OTP',
            err:error,
        }) 
    }
}

// GET - successfully redirect the user when OTP is valid
//     - http://localhost:8080/api/v1/createResetSession
const createResetSession=async(req,res)=>{
    try {
        if(req.app.locals.resetSession) {
            req.app.locals.resetSession = false;
        }else {
            throw {message: 'Session expired',statusCode:400}
        }
        return res.status(200).json({
            data:[],
            success: true,
            message: 'access granted',
            err:error,
        }) 
    } catch (error) {
        const {statusCode,message} = error;
        return res.status(statusCode?statusCode:500).json({
            data:[],
            success: false,
            message: message ? message:'unable to verify the OTP',
            err:error.stack,
        }) 
    }
}

// PUT - http://localhost:8080/api/v1/resetPassword
const resetPassword=async(req,res)=>{
    try {
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfullu reset the password',
            err:error,
        }) 
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to reset password',
            err:error,
        }) 
    }
}

module.exports = {
    createResetSession,
    generateOTP,
    getUser,
    login,
    resetPassword,
    verifyOTP,
    updateUser,
    register,
    getUsers,
    isAuthenticated
}