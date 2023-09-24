const sqlite = require('promised-sqlite3');
let db = null;

async function init() {
    db = await sqlite.AsyncDatabase.open('./data.db');
    await createTables();
}

async function createTables() {
    await db.run("CREATE TABLE IF NOT EXISTS users (" +
        "uuid VARCHAR(64) PRIMARY KEY, " +
        "email VARCHAR(64), " +
        "json TEXT" +
    ")");

    await db.run("CREATE TABLE IF NOT EXISTS items (" +
        "uuid VARCHAR(64) PRIMARY KEY, " +
        "user_uuid VARCHAR(64), " +
        "json TEXT" +
    ")");

    await db.run("CREATE TABLE IF NOT EXISTS notifications (" +
        "uuid VARCHAR(64) PRIMARY KEY, " +
        "user_uuid VARCHAR(64), " +
        "json TEXT" +
    ")");
}

/*
    Users Calls
*/

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

async function insertUser(json) {
    await db.run("INSERT INTO users VALUES (?, ?, ?)", [json.uuid, json.email, JSON.stringify(json)]);
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
    return JSON.parse(row.json);
}

async function updateItem(uuid, json) {
    await db.run("UPDATE items SET json = ? WHERE uuid = ?", [JSON.stringify(json), uuid]);
}

module.exports = {
    init: init,
    getUser: getUser,
    getUserByUuid: getUserByUuid,
    insertUser: insertUser,
    userExists: userExists,
    insertItem: insertItem,
    getAllItems: getAllItems,
    getItem: getItem,
    updateItem: updateItem
}