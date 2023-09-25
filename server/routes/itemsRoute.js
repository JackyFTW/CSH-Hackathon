const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

const globals = require('../util/globals');
const items = require('../api/items');

router.post('/', jsonParser, async (req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await items.createItem(uuid, req, res);
});
router.patch('/:uuid', jsonParser, async(req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await items.editItem(uuid, req, res);
});
router.delete('/:uuid', async(req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await items.deleteItem(uuid, req, res);
})
router.get('/', async (req, res) => {
    let uuid = globals.getUserUuid(req, res);
    if(!uuid) return;
    await items.getSelfItems(uuid, res);
});
router.get('/:uuid', async (req, res) => {
    let uuid = globals.getUserUuid(req, res, false);
    await items.getItem(uuid, req, res);
});

module.exports = router;