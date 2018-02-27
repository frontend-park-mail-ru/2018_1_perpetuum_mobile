'use strict';

const port = 3000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const debug = require('debug');
const logger = debug('mylogger');
const uuid = require('uuid/v4');
const morgan = require('morgan');

logger('Starting app');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const users = {
    'warprobot@corp.mail.ru': {
        email: 'warprobot@corp.mail.ru',
        password: 'password',
        score: 72
    },
    'd.dorofeev@corp.mail.ru': {
        email: 'd.dorofeev@corp.mail.ru',
        password: 'password',
        score: 100500
    },
    'a.udalov@corp.mail.ru': {
        email: 'a.udalov@corp.mail.ru',
        password: 'password',
        score: 72
    },
    'marina.titova@corp.mail.ru': {
        email: 'marina.titova@corp.mail.ru',
        password: 'password',
        score: 72
    },
    'a.tyuldyukov@corp.mail.ru': {
        email: 'a.tyuldyukov@corp.mail.ru',
        password: 'password',
        score: 72
    }
};

const ids = {};

app.post('/login', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({error: 'E-Mail or Password unspecified'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({error: 'E-Mail and/or password is invalid'});
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('blendocu', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.get('/users', function (req, res) {
    const scorelist = Object.values(users)
        .sort((l, r) => r.score - l.score)
        .map(user => {
            return {
                email: user.email,
                score: user.score
            };
        });

    res.json(scorelist);
});

app.post('/register', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    if (
        !password || !email ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[email]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const id = uuid();
    const user = {password, email, score: 0};
    ids[id] = email;
    users[email] = user;

    res.cookie('blendocu', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});


app.listen(port, function () {
    logger(`Server listening port ${port}`);
});






