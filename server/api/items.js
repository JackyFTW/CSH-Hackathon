const { v4: uuidv4 } = require('uuid');
const db = require('../db.js');
const users = require('./users.js');

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

    if(uuid !== item.userUuid) {
        res.status(403).json({
            status: 403,
            error: "Unauthorized request"
        });
        return;
    }

    let newPrimitives = req.body;
    let newItem = { ...item, ...newPrimitives };
    await db.updateItem(item.uuid, newItem);

    res.status(200).json({
        status: 200,
        message: "Successfully updated item"
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
        // Get all data
        res.status(200).json({
            status: 200,
            item: item
        });
    } else {
        // Check if found
        res.status(200).json({
            status: 200,
            item: {
                status: item.status
            }
        });
    }
}

module.exports = {
    createItem: createItem,
    editItem: editItem,
    getSelfItems: getSelfItems,
    getItem: getItem
}