const express = require('express');
const app = express();
const {
    config
} = require('./config/index');
const {
    logErrors,
    wrapErrors,
    errorHandler,
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to FG POS"
    })
});

// Catch not found error - 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});