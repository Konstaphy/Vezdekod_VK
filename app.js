const express = require('express')
const path = require("path");
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 80

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "/index2.html"))
})

const start = () => {
    app.listen(PORT, () => {
        console.log('Server started on port ' + PORT + '...')
    })
}

start()