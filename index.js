// external library-s
const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { dirname } = require('path');

// express use cases
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors())

const port = 3010

// list typing { id: 0, address: "", extra_value: ""}
var propertyList = [
    { id: 1, address: "kopli 1", extra_value: "test"},
    { id: 2, address: "test-2", extra_value: "CAPS TEST"},
    { id: 3, address: "test-3", extra_value: "num6er 135t"}
]

// credentials for logging in
const credentials = [
    {id: 1, username: "Admin", email: "admin@usage.com", password: "qwerty", isAdmin: true, ip: ""},
    {id: 2, username: "Kevin", email: "kevin@usage.com", password: "kevin", isAdmin: false, ip: ""},
    {id: 3, username: "Andres", email: "andres@usage.com", password: "andres", isAdmin: false, ip: ""}
]

// for testing server lag
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

// for rendering the page
app.get('/', (req, res) => {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.setHeader('content-type', 'text/html');
        res.send(html)
    });

})

// send the template list
app.get('/propertyList', (req, res) => {
    res.send(propertyList)
});

// send a single list from the template list
app.get('/propertyList/:id', (req, res) => {
    res.send(propertyList[req.params.id])
});

server = app.listen(port, () => {
    console.log(`API up at: https://localhost:${port}`);
});

// websocket part
const io = require("socket.io")(server, {cors: {origin: "*"}})

io.on('connection', socket => {
    console.log("A new socket client has conneted")
})