const { v4: uuidv4 } = require('uuid');

const globals = require('../util/globals');
const db = require('../util/db');

async function createItem(uuid, req, res) {
    let item = req.body;
    item.uuid = uuidv4();
    item.userUuid = uuid;

    await db.insertItem(item);
    res.status(200).json({
        status: 200,
        message: "Successfully created item"
    });
}

async function editItem(uuid, req, res) {
    let item = await db.getItem(req.params.uuid);

    if(item === null) {
        res.status(404).json({
            status: 404,
            error: "Item does not exist"
        });
        return;
    }

    if(uuid !== item.userUuid) {
        globals.sendUnauthorized(res);
        return;
    }

    let newItem = { ...item, ...req.body };
    await db.updateItem(item.uuid, newItem);

    res.status(200).json({
        status: 200,
        message: "Successfully updated item"
    });
}

async function deleteItem(uuid, req, res) {
    let item = await db.getItem(req.params.uuid);

    if(item === null) {
        res.status(404).json({
            status: 404,
            error: "Item does not exist"
        });
        return;
    }

    if(uuid !== item.userUuid) {
        globals.sendUnauthorized(res);
        return;
    }

    await db.deleteItem(item.uuid);
    res.status(200).json({
        status: 200,
        message: "Successfully deleted item"
    });
}

async function getSelfItems(uuid, res) {
    let items = await db.getAllItems(uuid);
    
    res.status(200).json({
        status: 200,
        items: items
    });
}

async function getItem(uuid, req, res) {
    let item = await db.getItem(req.params.uuid);

    if(uuid === item.userUuid || item.status === 1) {
        // Owns the item
        res.status(200).json({
            status: 200,
            item: item
        });
    } else {
        // Does not own the item
        res.status(200).json({
            status: 200,
            item: {
                status: item.status
            }
        });
    }
}

module.exports = {
    createItem,
    editItem,
    deleteItem,
    getSelfItems,
    getItem
};