const express = require('express');
const path = require('path');

const app = express();
const port = process.env.REST_PORT;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});