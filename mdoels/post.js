const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title required",
        
        },
        body: {
            type: String,
            required: true,
    

        }
    }
)

module.exports = mongoose.model("Post", postSchema);