const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const globals = require('../util/globals');
const users = require('../api/users');

router.post('/', jsonParser, async (req, res) => await users.createUser(req, res));
router.post('/auth', jsonParser, async (req, res) => await users.auth(req, res));
router.get('/', async (req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await users.getSelfUser(uuid, res);
});

module.exports = router;