const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../db.js');

let accessTokens = []

async function createUser(req, res) {
    let user = req.body;

    if(await db.userExists(user.email)) {
        res.status(409).json({
            status: 409,
            error: "Email already exists" 
        });
        return;
    }

    user.uuid = uuidv4();
    user.password = await bcrypt.hash(user.password, 10);
    await db.insertUser(user);
    res.status(200).json({ 
        status: 200,
        message: "Successfully created user" 
    });
}

async function auth(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let success = false;
    let user = null;
    if(await db.userExists(email)) {
        user = await db.getUser(email);
        
        success = await bcrypt.compare(password, user.password);
    }

    if(success) {
        let token = uuidv4();
        accessTokens[token] = user.uuid;

        res.status(200).json({
            status: 200,
            accessToken: token
        });
    } else {
        res.status(403).json({
            status: 403,
            error: "Invalid email or password"
        });
    }
}

async function getSelfUser(uuid, res) {
    let user = await db.getUserByUuid(uuid);

    res.status(200).json({
        status: 200,
        user: user
    });
}

module.exports = {
    accessTokens: accessTokens,
    createUser: createUser,
    auth: auth,
    getSelfUser: getSelfUser
}