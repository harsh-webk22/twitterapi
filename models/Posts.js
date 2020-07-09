const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    tweet:{
        type: 'String',
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}  ,{
    timestamps: true
});

const Posts  = new mongoose.model('Posts' , postSchema);
module.exports = Posts;