const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const userControllers = {
    signin: (req, res) => {
        if(req.session.loggedUser){
            res.redirect("/error")
        }
        res.render("signin", {
            title: "Sign In",
            loggedUser: req.session.loggedUser,
            name: req.session.name,
            age: req.session.age,
            userId: req.session.userId,
            error: null,
        })
    },
    signup: (req, res) => {
        if(req.session.loggedUser){
            res.redirect("/error")
        }
        res.render("signup", {
            title: "Sign Up",
            error: null,
            loggedUser: req.session.loggedUser,
            name: req.session.name,
            age: req.session.age,
            userId: req.session.userId
        })
    },
    error404:(req,res)=>{
        res.render("error", {
            title: "Error",
            error: null,
            loggedUser: req.session.loggedUser,
            name: req.session.name,
            age: req.session.age,
            userId: req.session.userId
        })
    },
    newUser: async (req, res) => {
        const {name,lastname,age,email,password} = req.body
           
        try {
            const existenceUser = await User.findOne({email: email,})
            if (existenceUser)throw new Error("email already in use!")
            
                // const salt=bcryptjs.genSaltSync(10)
                // const hash=bcryptjs.hashSync(password,salt)
                const newUser = await new User({
                    name,
                    lastname,
                    age,
                    email,
                    password,
                })
                await newUser.save()
                req.session.loggedUser = true
                req.session.userId = newUser._id
                req.session.name = newUser.name
                req.session.age = newUser.age
                res.redirect('/')
            
        } catch (err) {
            res.render("signup", {
                title: "Sign Up",
                error: err,
                loggedUser: req.session.loggedUser,
                name: req.session.name,
                age: req.session.age,
                userId: req.session.userId
            })
        }
    },
    logUser: async (req, res) => {
        const {
            email,
            password
        } = req.body
        try {
            const existenceUser = await User.findOne({
                email: email,
            })
            if (existenceUser && existenceUser.password === password) {
                req.session.loggedUser = true
                req.session.userId = existenceUser._id
                req.session.name = existenceUser.name
                req.session.age = existenceUser.age
                return res.redirect("/")
            } else {
                res.render("signin", {
                    title: "Sign In",
                    error: "email or password incorrect!",
                    loggedUser: req.session.loggedUser,
                    name: req.session.name,
                    age: req.session.age,
                    userId: req.session.userId
                })
            }
        } catch (err) {
            res.render("signin", {
                title: "Sign In",
                error: err,
                loggedUser: req.session.loggedUser,
                name: req.session.name,
                age: req.session.age,
                userId: req.session.userId
            })
        }
    },
    logOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/")
        })
    },
}

module.exports = userControllers