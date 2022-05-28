const mongoose=require('mongoose');

const postSchema =mongoose.Schema({
title:{type:String,required:true},
content:{type:String,required:true},
imagePath:{type:String,required:true},
creator:{type:mongoose.Schema.Types.ObjectId ,ref:"User",required:true}//id treated as in mongoose and create -who is cretaing post
});//ref-proprty allow to define which model this we r going to store here will blong & store user id here

module.exports=mongoose.model('Post',postSchema);
