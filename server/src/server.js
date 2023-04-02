const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const connect = require('./database/conn');
const { sendOTPMail } = require('./services/email-service');

const start = async() => {

    const app = express();
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use(cors());
    app.use(express.urlencoded({extended:false}));
    // X-Powered-By header is used to inform what technology is used in the server side. This is an unnecessary header causing information leakage, so it should be removed from your application.
    app.disable('x-powered-by');
    app.use('/api',apiRoutes);

    /** start server when we have valid mongo db connection */
    connect().then(()=>{
        try {
            app.listen(PORT,()=>{
                console.log(`server is listening on PORT http://localhost:${PORT}`);
            })
        } catch (error) {
            console.log('cannot connect to the server',error);
        }
    }).catch(err=>{
        console.log('invalid db connection',err)
    })
   
}

start();