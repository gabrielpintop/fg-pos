const express = require('express');
const app = express();
const {
    config
} = require('./config/index');

const productsApi = require('./routes/products.js');
const invoicesApi = require('./routes/invoices.js');

const {
    logErrors,
    wrapErrors,
    errorHandler,
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

// Routes
productsApi(app);
invoicesApi(app);

// Catch not found error - 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});