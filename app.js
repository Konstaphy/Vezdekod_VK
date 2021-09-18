const express = require('express')
const path = require("path");
require('dotenv').config()
const cors = require('cors')

const router = require('./router/Router')

const app = express()

const PORT = process.env.PORT || 80

app.use(express.json())
app.use(cors({
    credentials: true
}))

app.use('/api', router, () => {
    console.log('router worked')
})

app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "/index.html"))
})

const start = () => {
    app.listen(PORT, () => {
        console.log('Server started on port ' + PORT + '...')
    })
}

start()