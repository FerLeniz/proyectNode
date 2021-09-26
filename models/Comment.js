const Sequelize = require('sequelize')
const database = require('../config/database')

const Comment= database.define('comment',{
    comment:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    age:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
},{
    timestamps: false
  })


module.exports=Comment