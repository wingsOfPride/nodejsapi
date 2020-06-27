const express = require('express');
const {getPosts,createPost, postsByUser, postById, isPoster, deletePost} = require('../controllers/post');
const {createPostValidator} = require('../validator/index')
const { requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user');

const router = express.Router()

router.get('/', getPosts);

router.post(
    '/post/new/:userId',
     requireSignin,
      createPost,
      createPostValidator
      );

router.get("/posts/by/:userId",requireSignin, postsByUser)

router.delete('/post/:postId', requireSignin, isPoster, deletePost)

router.param("userId", userById)

router.param("postId", postById)

module.exports = router;