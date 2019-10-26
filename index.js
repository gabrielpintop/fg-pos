const express = require('express');
const app = express();
const {
    config
} = require('./config/index');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to FG POS"
    })
});

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});