const express = require('express');
const db = require('./config/mongoose');
const Users = require('./models/Users');
const Followers = require('./models/Followers');
const Posts = require('./models/Posts');
const app = express();


app.use(express.urlencoded());

// to create user user needs to send POST request to server 
// with name, username , password as keys

app.post('/createUser' ,async function(req ,res){
    try {

        let user = await Users.findOne({username :req.body.username });
        if(user){
            return res.json(200 , {
                message: 'User already exits'
            });
        }

        let user = await Users.create({
            name: req.body.name,
            username:req.body.username,
            password:req.body.password
        });
    
        console.log(user)
    
        res.json(200 , {
            message:'user succefully created'
        });    
    } catch (error) {
        console.log(error);
        res.json(200 , {
            message:'error in creating the user'
        })
    }
   
    
});

// to follow someone user needs to send post request to server 
// with followedTo and followedBy as key
// former one being the actual user latter one being whom he wants to follow

app.post('/followUser' ,async (req ,res)=>{
    let followedBy =await Users.findOne({username: req.body.followedBy});
    let followedTo =await Users.findOne({username: req.body.followedTo});

    if(followedBy || followedTo){
        res.json(200 , {
            message: 'user does not exist'
        })
    }

    console.log(followedTo)

    let follow =await Followers.create({
        followedBy: followedBy._id,
        followedTo: followedTo._id
    });

    followedBy.following.push({followedTo: followedTo._id })
    followedBy.save();
    console.log(follow);

    res.json(200 , {
        message: `${req.body.followedBy} started following ${req.body.followedTo}`
    });
   
})



// to get all the details about the user , user needs to 
// send get request to /getUser{username}
// it will show all the details of the user including password

app.get('/getUser/:username' ,async (req , res)=>{
    let user = await Users.findOne({username: req.params.username});
    console.log(user)
    if(user){
        res.json(200 , {
            message: 'user found',
            user: user
        });
    } else{
        res.json(200 , {
            message: 'user not found'
        });
    }
});



// to create post you need to post request with 
// username as key which contains username  of user who is posting the tweet
// post as key which contains actual tweet which He/she wants to post 

app.post('/createPost' , async (req , res)=>{
    let user = await Users.findOne({username : req.body.username});
    if(!user){
        res.json(200  , {
            message: 'user does not exists'
        })
    }
    let post = req.body.post;

    let tweet = await Posts.create({
        tweet: post,
        postedBy: user._id
    });
    console.log(tweet);
    res.json(200 , {
        message: 'tweet successfully created'
    })
});



// to get the all tweets posted by user you need to 
// send get request to /timeline/{user's username} 
app.get('/homeApi/:user' ,async (req ,res)=>{
    let user = await Users.findOne({username: req.params.user});
    if(!user){
        return res.json(200 ,{
            message: 'User does not exist'
        })
    }

    let tweets =await Posts.find({postedBy: user._id});
    res.json(200 , tweets);
});


// to get the timeline of the user you need to 
// send get request to /timeline/{user's username} 
app.get('/timelineApi/:user' , async (req, res)=>{
    let user = await Users.findOne({username: req.params.user});
    if(!user){
        return res.json(200 ,{
            message: 'User does not exist'
        })
    }


    let following = user.following; 

    let arr=[]
    for(let i=0;i<following.length;i++){
        let tweets = await Posts.find({postedBy: following[i].followedTo});
        arr = await arr.concat(tweets);
    }
    console.log(arr);

    res.json(200 , arr)
})


app.get('/' , function(req , res){
    res.json(200 , {
        message: 'hello this is twitter clone api'
    });
})

app.listen('4000' , function(){
    console.log('Server is listening on port 4000')
})