const express = require('express');
const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
//const {createPostValidator} = require('../validator/index')
const {userSignupValidator} = require('../validator/index')


const router = express.Router()



router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout)


//any route containing : userId , our app will first execute userByID
router.param("userId", userById)



module.exports = router;