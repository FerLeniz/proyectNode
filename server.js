const express=require('express')
const router= require("./routes/index")
const session = require('express-session')
const mongo = require('connect-mongodb-session')(session)
require('dotenv').config()
require('./config/database')

const myStore = new mongo({
    uri: process.env.MONGO,
    collection: 'sessions'
})

const app=express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.PHRASE,
    resave: false,
    saveUninitialized: false,
    store: myStore
}))

app.use('/',router)

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log("Server listening!"))