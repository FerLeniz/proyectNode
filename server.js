const express = require('express')
const router = require("./routes/index")
const session = require('express-session')
const database = require('./config/database')
const User = require('./models/User')
const Comment=require('./models/Comment')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config()
require('./config/database')

Comment.belongsTo(User)
User.hasMany(Comment)

const myStore = new SequelizeStore({
    db: database,
});

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: true
}))
app.use(session({
    secret: process.env.PHRASE,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: myStore
}))



myStore.sync()
database.sync()
    .then(() => {
        app.use('/', router)
        app.listen(4000, () => console.log("Server listening!"))
    })
