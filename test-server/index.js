'use strict';

const port = 3000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const debug = require('debug');
const logger = debug('mylogger');

logger('Starting app');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(body.json());
app.use(cookie());

app.listen(port, function () {
    logger(`Server listening port ${port}`);
});






