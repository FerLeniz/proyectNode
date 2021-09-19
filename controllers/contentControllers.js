const path = require('path')
const Comment = require('../models/Comment')

const contentControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'Home',
            loggedUser: req.session.loggedUser,
            name: req.session.name,
            age: req.session.age,
            userId: req.session.userId
        })
    },
    reviews: async (req, res) => {
        if(!req.session.loggedUser){
            res.redirect("/error")
        }

        const comments = await Comment.find()
        res.render('reviews', {
            title: 'Reviews',
            comments,
            error: null,
            edited: false,
            loggedUser: req.session.loggedUser,
            name: req.session.name,
            age: req.session.age,
            userId: req.session.userId
        })
    },
    addComment: async (req, res) => {
        const {comment,_id} = req.body
        let newComment;
        
            if(!_id){
                newComment = new Comment({
                   comment,
                   userId: req.session.userId,
                   name: req.session.name,
                   age: req.session.age,
                  loggedUser: req.session.loggedUser,
               })
             }else{
                newComment = await Comment.findOne({_id})
                 newComment.comment=comment
             }
        

        try {
            newComment.save()
            res.redirect('/reviews')
        } catch (err) {
            let comments = await Comment.find()
            res.render('reviews', {
                title: 'Reviews',
                comments,
                error: err,
                edited: false,
                loggedUser: req.session.loggedUser,
                name: req.session.name,
                age: req.session.age,
                userId: req.session.userId
            })
        }

    },
    deleteComment: async (req, res) => {
        const idComment = req.params._id
        try {
            await Comment.findByIdAndDelete({
                _id: idComment
            })
            res.redirect('/reviews')
        } catch (err) {
            res.render('reviews', {
                title: 'Reviews',
                error: err,
            })
        }
    },
    editComment: async (req, res) => {
        const idComment = req.params._id

        try {
            let commentActual = await Comment.findOne({
                _id: idComment
            })
            let comments = await Comment.find()
            res.render('reviews', {
                title: 'Reviews',
                comments,
                error: null,
                edited: commentActual,
                loggedUser: req.session.loggedUser,
                name: req.session.name,
                age: req.session.age,
                userId: req.session.userId
            })
        } catch (err) {
            res.render('reviews', {
                title: 'Reviews',
                error: err,
                edited: false,
                loggedUser: req.session.loggedUser,
                name: req.session.name,
                age: req.session.age,
                userId: req.session.userId
            })
        }

    }
}

module.exports = contentControllers