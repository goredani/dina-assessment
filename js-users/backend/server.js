const express = require('express');
const path = require('path');
const port = 9000;

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/')));


app.get('/users/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/users/users.html'));
  });

app.get('/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/edit/edit.html'));
})

app.get('/new/', (req, res) => {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, '../frontend/new/new.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})