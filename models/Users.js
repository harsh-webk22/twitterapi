const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required: true
    },
    username:{
        type: 'String',
        required: true
    },
    password:{
        type: 'String',
        required: true
    },
    following:[{
        followedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
       
    }]
}  ,{
    timestamps: true
});

const Users  = new mongoose.model('Users' , userSchema);
module.exports = Users;