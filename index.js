let PORT = process.env.PORT || 3000
const express = require('express');
const app = express();

let http = require('http');
let server = http.Server(app);

app.use(express.static('public'));

server.listen(PORT, function() {
    console.log('server running');
});

