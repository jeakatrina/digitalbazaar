const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log("connected to MongoDB!")
})

mongoose.connection.on('error', (err)=>{
    console.log("error connecting", err)
})

require('./models/user')
require('./models/item')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/item'))

app.listen(PORT, ()=>{
    console.log("Server is running on", PORT)
})


/*
//simple example of middleware
const customMiddleware = (req, res, next)=>{
    console.log("middleware executed!")
    next()
}

//example of a home page
app.get('/', (req, res)=>{
    console.log("home")
    res.send("hello user")
})

//example of an about page
app.get('/about', customMiddleware, (req, res)=>{
    console.log("about")
    res.send("about page")
})

//apparently required in older verions of node.js(i think). if required, use this instead
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
*/
