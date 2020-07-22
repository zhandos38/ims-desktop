const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

// routers
const routeUser = require('./routes/user');
const routeInvoice = require('./routes/invoice');

const app = express();
const port = 4040;

// use the modules
app.use(cors())
app.use(bodyParser.json());

// use router
app.use('/user', routeUser);
app.use('/invoice', routeInvoice);

// starting the server
app.listen(port , () => console.log(`Server started, listening port: ${port}`));
