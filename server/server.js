const express = require('express');
const db = require('./util/db');
const app = express();

const users = require('./routes/usersRoute');
const items = require('./routes/itemsRoute');
const notifs = require('./routes/notificationsRoute');

app.use((req, res, next) => {
    console.log(req);
    next();
})

// Routes
app.use('/users', users);
app.use('/items', items);
app.use('/notifications', notifs)

async function start() {
    await db.init();
    app.listen(9090, async () => {
        console.log(`Listening for requests...`);
    });
}

start();