const db = require('../db.js');

let accessTokens = []

async function createUser(req, res) {
    let user = req.body;

    if(await db.userExists(user)) {
        res.json({ error: "Email already exists" });
        return;
    }

    await db.insertUser(user);
    res.json({ message: "Successfully created user" });
}

async function auth(req, res) {
    let email = req.email;
    let password = req.password;
}

module.exports = {
    createUser: createUser,
    auth: auth
}