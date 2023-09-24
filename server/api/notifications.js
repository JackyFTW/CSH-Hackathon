const { v4: uuidv4 } = require('uuid');
const db = require('../db.js');

async function createNotif(req, res) {
    let item = await db.getItem(req.body.itemUuid);

    if(item === null) {
        res.status(404).json({
            status: 404,
            error: "Item does not exist"
        });
        return;
    }

    if(item.status !== 1) {
        res.status(403).json({
            status: 403,
            error: "Forbidden request, item not lost"
        });
        return;
    }

    let notif = {
        uuid: uuidv4(),
        userUuid: item.userUuid,
        itemUuid: item.uuid,
        time: Date.now(),
        message: item.name + " was found!",
        status: 0
    };

    await db.updateItem(item.uuid, { ...item, status: 2 });
    await db.insertNotif(notif);
    res.status(200).json({
        status: 200,
        message: "Successfully sent notification"
    });
}

async function editNotif(uuid, req, res) {
    let notif = await db.getNotif(req.params.uuid);

    if(notif === null) {
        req.status(404).json({
            status: 404,
            error: "Notification does not exist" 
        });
        return;
    }

    if(uuid !== notif.userUuid) {
        req.status(401).json({
            status: 401,
            error: "Unauthorized request"
        });
        return;
    }

    let newNotif = { ...notif, ...req.body };
    await db.updateNotif(notif.uuid, newNotif);
    
    res.status(200).json({
        status: 200,
        message: "Successfully updated notification"
    });
}

async function getSelfNotifs(uuid, res) {
    let notifs = await db.getAllNotifs(uuid);

    res.status(200).json({
        status: 200,
        notifs: notifs
    });
}

module.exports = {
    createNotif: createNotif,
    editNotif: editNotif,
    getSelfNotifs: getSelfNotifs
}