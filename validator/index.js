exports.createPostValidator = (req,res,next) => {


    req.check('title', "Write a title").notEmpty()
   

       //body
       req.check('body', "Write a body").notEmpty()
     

       //check for errors
    
       const errors = req.validationErrors()
    
       //if error show the first one as they appear
       if(errors){
           const firstError = errors.map(error => error.msg)[0];

           return res.status(400).json({
               error: firstError
           })
       }
       // proceed to next middleware
       next();

}