const express = require('express');
const db = require('./util/db');
const app = express();

const users = require('./routes/usersRoute');
const items = require('./routes/itemsRoute');
const notifs = require('./routes/notificationsRoute');

// Routes
app.use('/apiv2/users', users);
app.use('/apiv2/items', items);
app.use('/apiv2/notifications', notifs)

async function start() {
    await db.init();
    app.listen(9090, async () => {
        console.log(`Listening for requests...`);
    });
}

start();