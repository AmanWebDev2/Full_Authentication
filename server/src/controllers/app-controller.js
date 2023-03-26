
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
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfullu register the user',
            err:error,
        }) 
    } catch (error) {
        res.status(500).json({
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
        res.status(500).json({
            data:[],
            success: true,
            message: 'successfully login',
            err:error,
        }) 
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to login',
            err:error,
        })
    }
}

// http://localhost:8080/user/<username>
const getUser=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            data:[],
            success: false,
            message: 'unable to get the user',
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
    register
}