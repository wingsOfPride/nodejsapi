const User = require('../mdoels/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()



exports.signup = async (req,res) => {

    console.log("MY REQUEST", req.body)

    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
        return res.status(400).json({
            error: "Email is taken"
        });
    }else{
        const user = await new User(req.body);
        await user.save();
        res.status(200).json({user})
    }


  };

  exports.signin = (req, res) =>{

    //find the user based on email

    const {email, password} = req.body

    User.findOne({email}, (err,user) => {
        if(err || !user){
            return res.status(404).json({
                error: "User with that email does not exist. Please signin."
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JTW_SECRET);

        res.cookie("t", token, {expire: new Date() + 9999})
        // if user is found make sure the email and password match

        const {_id, name,email} = user

        return res.json({token, user: {_id, email,name}})
        //create authenticate method in model and use here
    })


  }
  exports.signout = (req,res) => {
    res.clearCookie("t")
    return res.json({
        message: "Signout success"
    })


}
exports.requireSignin = expressJwt({

    //if the token is valid, express jwt appends the verified users id
    //in an auth key to the request object
    secret: process.env.JTW_SECRET,
    userProperty: "auth"
})