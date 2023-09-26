const sqlite = require('promised-sqlite3');

let db = null;

async function init() {
    db = await sqlite.AsyncDatabase.open('/home/servers/PublicEye/server/data/data.db');
    await createTables();
}

async function createTables() {
    await db.run("CREATE TABLE IF NOT EXISTS users (" +
        "uuid VARCHAR(64) PRIMARY KEY," +
        "email VARCHAR(64)," +
        "json TEXT" +
    ")");

    await db.run("CREATE TABLE IF NOT EXISTS items (" +
        "uuid VARCHAR(64) PRIMARY KEY," +
        "user_uuid VARCHAR(64)," +
        "json TEXT" +
    ")");

    await db.run("CREATE TABLE IF NOT EXISTS notifications (" +
        "uuid VARCHAR(64) PRIMARY KEY, " +
        "user_uuid VARCHAR(64)," +
        "item_uuid VARCHAR(64), " +
        "json TEXT" +
    ")");
}

/*
    Users Calls
*/

async function insertUser(json) {
    await db.run("INSERT INTO users VALUES (?, ?, ?)", [json.uuid, json.email, JSON.stringify(json)]);
}

async function getUser(email) {
    let stmt = await db.prepare("SELECT json FROM users WHERE email = ? LIMIT 1", [email]);
    let row = await stmt.get();
    return JSON.parse(row.json);
}

async function getUserByUuid(uuid) {
    let stmt = await db.prepare("SELECT json FROM users WHERE uuid = ? LIMIT 1", [uuid]);
    let row = await stmt.get();
    return JSON.parse(row.json);
}

async function userExists(email) {
    let stmt = await db.prepare("SELECT COUNT(email) AS count FROM users WHERE email = ?", [email]);
    let row = await stmt.get();
    return row.count != 0;
}

/*
    Items Calls
*/

async function insertItem(json) {
    await db.run("INSERT INTO items VALUES (?, ?, ?)", [json.uuid, json.userUuid, JSON.stringify(json)]);
}

async function updateItem(uuid, json) {
    await db.run("UPDATE items SET json = ? WHERE uuid = ?", [JSON.stringify(json), uuid]);
}

async function deleteItem(uuid) {
    await db.run("DELETE FROM items WHERE uuid = ?", [uuid]);
}

async function getAllItems(userUuid) {
    let items = [];
    await db.each("SELECT json FROM items WHERE user_uuid = ?", [userUuid], row => {
        items.push(JSON.parse(row.json));
    });
    return items;
}

async function getItem(uuid) {
    let stmt = await db.prepare("SELECT json FROM items WHERE uuid = ? LIMIT 1", [uuid]);
    let row = await stmt.get();
    return row === undefined ? null : JSON.parse(row.json);
}

/*
    Notifications
*/

async function insertNotif(json) {
    await db.run("INSERT INTO notifications VALUES (?, ?, ?, ?)", [json.uuid, json.userUuid, json.itemUuid, JSON.stringify(json)]);
}

async function updateNotif(uuid, json) {
    console.log(json);
    await db.run("UPDATE notifications SET json = ? WHERE uuid = ?", [JSON.stringify(json), uuid]);
}

async function getAllNotifs(userUuid) {
    let notifs = [];
    await db.each("SELECT json FROM notifications WHERE user_uuid = ?", [userUuid], row => {
        notifs.push(JSON.parse(row.json));
    });
    return notifs;
}

async function getNotif(uuid) {
    let stmt = await db.prepare("SELECT json FROM notifications WHERE uuid = ? LIMIT 1", [uuid]);
    let row = await stmt.get();
    return row === undefined ? null : JSON.parse(row.json);
}

module.exports = {
    init,
    insertUser, getUser, getUserByUuid, userExists,
    insertItem, updateItem, deleteItem, getAllItems, getItem,
    insertNotif, updateNotif, getAllNotifs, getNotif
};