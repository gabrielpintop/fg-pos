const express = require('express');
const app = express();
const {
    config
} = require('./config/index');
const {
    logErrors,
    errorHandler
} = require('./utils/middleware/errorHandlers.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to FG POS"
    })
});

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});