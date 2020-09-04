require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json()) // parse the json request body before calling routes 
app.use(authRoutes)

const mongoUri = 'mongodb+srv://admin:admin123@cluster0.jdids.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.log('Error connecting mongo:', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email:${req.user.email}`)
})

app.listen(1800, () => {
    console.log('Listening on port 1800')
})