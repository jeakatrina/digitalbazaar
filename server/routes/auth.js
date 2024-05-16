const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


/*
//for testing purposes
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hi user!")
})
*/


router.post('/signup',(req,res)=>{
    const {username,name,email,artist,password} = req.body
    if(!username || !name || !email || artist == null || !password){
        return res.status(422).json({error:"please add all the fields."})
    }
    User.findOne({username:username})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Username has already been used."})
        }
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"Email has already been used."})
            }
            bcrypt.hash(password, 12)
            .then(hashedpassword=>{
                const user = new User({
                    username,
                    name,
                    email,
                    artist,
                    password:hashedpassword
                })

                user.save()
                .then(user=>{
                    res.json({message:"User saved successfully!"})
                })
                .catch(err=>{
                    console.log(err)
                })
            }) 
        })    
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please enter email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password."})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"Sign in sucessful!"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid email or password."})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router
