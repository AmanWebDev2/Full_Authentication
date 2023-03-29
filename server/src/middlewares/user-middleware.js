const UserRepository = require("../repository/user-repository");

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
        if(!user) return res.status(404).send({error: 'User does not exist'})
        next();
    } catch (error) {
        return res.status(403).send({error: 'Authentication Error'})
    }
}   

module.exports = {
    validateRegisterUser,
    validateLogin,
    verifyUser
}