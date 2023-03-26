const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config/serverConfig');

const start = async() => {

    const app = express();
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use(cors());
    // X-Powered-By header is used to inform what technology is used in the server side. This is an unnecessary header causing information leakage, so it should be removed from your application.
    app.disable('x-powered-by');

    console.log(process.env.PORT)
    app.listen(PORT,()=>{
        console.log(`server is listening on PORT http://localhost:${PORT}`);
    })
}

start();