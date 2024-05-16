const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const itemModel = mongoose.model('Item');

router.post('/createitem',requireLogin,(req,res)=>{
    const {title,price} = req.body
    if(!title || !price){
        return res.status(422).json({error:"Please enter all required fields"})
    }

    req.user.password = undefined //prevents the user password to be stored in items.
    const item = new itemModel({
        title,
        price,
        artist:req.user
    })
    item.save().then(result=>{
        res.json({item:result})
    })
    .catch(err=>{
        console.log()
    })
})


module.exports = router
