const mailGen = require('mailgen');

const sender = require('../config/emailConfig');
const { EMAIL_ID } = require('../config/serverConfig');

let mailGenerator = new mailGen({
    theme:'default',
    product: {
        name: 'Mail gen',
        link: 'https://mailgen.js/'
    }
})

const sendOTPMail =(message)=> {
    sender.sendMail(message);
};

/**
 * POST:
 * body {
    username: '',
    userEmail: '',
    text: '',
    subject:''
    }
 */

const registerMail =async(req,res)=>{
    try {
        const { userEmail, username, text, subject } = req.body;

        let email = {
            body: {
                name: username,
                intro: text || 'Welcome to mail service',
                outro: 'Need help, or have questions? just reply to this email.'
            }
        }

        let emailBody = mailGenerator.generate(email);

        let message = {
            from:EMAIL_ID,
            to: userEmail,
            subject: subject || 'signup successfully',
            html: emailBody 
        }

        sendOTPMail(message);

        return res.status(200).json({
            data: [],
            success: true,
            message: 'you should receive an email from us',
            err: {}
        })

    } catch (error) {
       return res.status(500).json({
        data: [],
        success: false,
        message: 'something went wrong',
        err: error
       }) 
    }
}


module.exports = {
    registerMail
}