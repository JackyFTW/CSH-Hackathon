const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')
const users = require('./api/users.js');

const app = express();
const jsonParser = bodyParser.json();

app.post('/apiv2/users', jsonParser, async (req, res) => await users.createUser(req, res));
app.post('/apiv2/users/auth', jsonParser, async (req, res) => await users.auth(req, res));

const port = 9090;
app.listen(port, async () => {
    await db.init();

    console.log(`Listening on ${port}...`);
});