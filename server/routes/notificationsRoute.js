const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const globals = require('../util/globals');
const notifs = require('../api/notifications');

router.post('/', jsonParser, async (req, res) => {
    await notifs.createNotif(req, res);
});
router.patch('/:uuid', jsonParser, async (req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await notifs.editNotif(uuid, req, res);
});
router.get('/', async (req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await notifs.getSelfNotifs(uuid, res);
});

module.exports = router;