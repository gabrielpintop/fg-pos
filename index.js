const express = require('express');
const app = express();
const {
  config
} = require('./config/index');
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const productsApi = require('./routes/products');
const invoicesApi = require('./routes/invoices');

app.use(express.json());

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