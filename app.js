const express = require('express');
const { append } = require('express/lib/response');
const path = require('path');

const PORT = 3001;
const APP = express();

APP.use(express.static(path.join(__dirname, 'Public')));
APP.use(express.json({ limit: '1mb', type: '*/*'}));

APP.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});
