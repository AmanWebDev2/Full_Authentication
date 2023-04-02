const jwt = require('jsonwebtoken');

const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require('../config/serverConfig');

const validateRegisterUser = (req,res,next) => {
    if(
        !req.body.username ||
        !req.body.password ||
        !req.body.email
    ) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'invalid request body for register user',
            err: 'missing mandatory properties for registering user'
        })
    }
    next();
};

const validateLogin=(req,res,next)=>{
    if(!req.body.username ||  !req.body.password) {
        return res.status(400).json({
            data: [],
            success: false,
            message: 'something went wrong',
            err: 'Email or password is missing !'
        })
    }
    next();
}

const verifyUser =async(req,res,next)=>{
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        const user = await UserRepository.getUserByUsername(username);
        if(!user) return res.status(404).json(
            {
                data:[],
                success: false,
                message:'something went wrong',
                error: 'User does not exist'
            })
        next();
    } catch (error) {
        return res.status(500).json(
            {
                data:[],
                success: false,
                message:'something went wrong',
                error: 'Authentication error'
            }
            )
    }
}   

const validateUpdateUser=(req,res,next)=>{
    if(
        !req.query.id
    ) {
        return res.status(400).json({
            data:[],
            success: false,
            message:'something went wrong', 
            err: 'missing mandatory properties',
        });
    }
    next();
}

const Auth=(req,res,next)=>{
    try {
        const token = req.headers['x-access-token'];
        if(!token) res.status(400).send('missing token');
        // verify token
        const decode = jwt.verify(token,JWT_KEY);
        if(!decode) res.status(400).send('not a valid token');
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            message: 'something went wrong',
            err: 'Authentication failed'
        })
    }
}

const localVariables=(req,res,next)=>{
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}

module.exports = {
    validateRegisterUser,
    validateLogin,
    verifyUser,
    validateUpdateUser,
    Auth,
    localVariables
}