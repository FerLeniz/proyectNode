const path = require('path')
const Comment = require('../models/Comment')

const contentControllers = {
    home: async (req, res) => {
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
         try{
             const comments = await Comment.findAll()
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
         }catch(err){
             console.log(err)
         }
        
    },
    addComment: async (req, res) => {
        const {comment,id} = req.body
        let newComment;
        
             if(!id){
                 newComment = new Comment({
                    comment,
                    userId: req.session.userId,
                    name: req.session.name,
                    age: req.session.age,
                   loggedUser: req.session.loggedUser,
                })
              }else{
                 
                 newComment = await Comment.findOne({where:{id}})
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
            await Comment.destroy({where:{id: idComment}})
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
            let commentActual = await Comment.findOne({where:{id: idComment}})
            const comments = await Comment.findAll({raw:true})

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

    },
}

module.exports = contentControllers