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

    if(item === null) {
        res.status(404).json({
            status: 404,
            error: "Item does not exist"
        });
        return;
    }

    if(uuid !== item.userUuid) {
        res.status(401).json({
            status: 401,
            error: "Unauthorized request"
        });
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
        res.status(401).json({
            status: 401,
            error: "Unauthorized request"
        });
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
    deleteItem: deleteItem,
    getSelfItems: getSelfItems,
    getItem: getItem
}