const express = require('express');
const path = require('path');
const port = 9000;

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/')));

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(path.join(`${__dirname}/../frontend/edit/index.html`))    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})