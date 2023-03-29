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

module.exports = {
    validateRegisterUser,
    validateLogin
}