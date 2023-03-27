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
        const user = await UserService.registerUser(data);
        return res.status(200).json({
            data:user,
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
        
    } catch (error) {
        return res.status(500).json({
            data:[],
            success: false,
            message: 'unable to get the user',
            err:error,
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
        
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to update the user',
            err:error,
        }) 
    }
}

// GET - http://localhost:8080/api/v1/generateOTP
const generateOTP=async(req,res)=>{
    try {
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfullu generated the OTP',
            err:error,
        }) 
    } catch (error) {
        res.status(500).json({
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
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfullu verify the OTP',
            err:error,
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
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfully created the reset session',
            err:error,
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