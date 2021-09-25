// const mongoose=require('mongoose')

// mongoose.connect(process.env.MONGO)
// .then(()=> console.log('database connected!'))
// .catch((error) => console.log(error))
const Sequelize = require("sequelize");// "username", "password",
const database= new Sequelize("antares", "root", "", {
    dialect: "mysql",
    host: 'localhost',
    // storage: "./session.mysql",
});

module.exports=database