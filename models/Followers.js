const mongoose = require('mongoose');

const followerSchema  = new mongoose.Schema({
    followedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    followedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
} ,{
    timestamps: true
});

const Followers = new mongoose.model('Follower' , followerSchema);
module.exports = Followers;