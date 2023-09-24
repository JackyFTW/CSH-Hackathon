const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')
const users = require('./api/users.js');
const items = require('./api/items.js');


const app = express();
const jsonParser = bodyParser.json();

// Users Endpoint
app.post('/apiv2/users', jsonParser, async (req, res) => await users.createUser(req, res));
app.post('/apiv2/users/auth', jsonParser, async (req, res) => await users.auth(req, res));
app.get('/apiv2/users', async (req, res) => {
    let uuid = getUserUuid(req, res);
    if(!uuid) return;
    await users.getSelfUser(uuid, res);
});

// Items Endpoint
app.post('/apiv2/items', jsonParser, async (req, res) => {
    let uuid = getUserUuid(req, res);
    if(!uuid) return;
    await items.createItem(uuid, req, res);
});
app.patch('/apiv2/items/:uuid', jsonParser, async(req, res) => {
    let uuid = getUserUuid(req, res);
    if(!uuid) return;
    await items.editItem(uuid, req, res);
});
app.get('/apiv2/items', async (req, res) => {
    let uuid = getUserUuid(req, res);
    if(!uuid) return;
    await items.getSelfItems(uuid, res);
});
app.get('/apiv2/items/:uuid', async (req, res) => {
    let uuid = getUserUuid(req, res);
    await items.getItem(uuid, req, res);
});

// Global Utils
function getUserUuid(req, res) {
    if(req.headers["authorization"] === undefined) return false;
    let token = req.headers["authorization"].split(" ")[1];

    if(token === null || users.accessTokens[token] === undefined) {
        res.status(403).json({
            status: 403,
            error: "Unauthorized request"
        });
        return false;
    }

    return users.accessTokens[token];
}

// Start REST API
const port = 9090;
app.listen(port, async () => {
    await db.init();

    console.log(`Listening on ${port}...`);
});