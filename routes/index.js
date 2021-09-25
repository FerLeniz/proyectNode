const express = require('express')
const router = express.Router()
const contentControllers=require('../controllers/contentControllers')
const userControllers=require('../controllers/userControllers')
const validator = require('../controllers/validator');

router.route('/')
.get(contentControllers.home)

router.route('/reviews')
.get(contentControllers.reviews)
.post(contentControllers.addComment)

router.route('/delete-comment/:_id')
.get(contentControllers.deleteComment)

router.route('/edit-comment/:_id')
.get(contentControllers.editComment)

//USER
router.route('/signin')
.get(userControllers.signin)
.post(userControllers.logUser)

router.route('/signup')
.get(userControllers.signup)
.post(userControllers.newUser)//validator,

router.route('/logout')
.get(userControllers.logOut)

router.route('/error')
.get(userControllers.error404)

module.exports = router