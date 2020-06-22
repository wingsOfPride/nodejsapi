const User = require('../mdoels/user')


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