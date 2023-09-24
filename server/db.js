const sqlite = require('promised-sqlite3');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
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

async function getUser(email) {
    await db.prepare("SELECT")
}

async function insertUser(json) {
    json.uuid = uuid();
    json.password = await bcrypt.hash(json.password, 10);
    await db.run("INSERT INTO users VALUES (?, ?, ?)", [json.uuid, json.email, JSON.stringify(json)]);
}

async function userExists(json) {
    let stmt = await db.prepare("SELECT COUNT(email) AS count FROM users WHERE email = ?", [json.email]);
    let row = await stmt.get();
    return row.count != 0;
}

module.exports = {
    init: init,
    userExists: userExists,
    insertUser: insertUser
}