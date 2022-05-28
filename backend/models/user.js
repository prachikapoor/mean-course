const mongoose=require('mongoose');
const uniqueValidator =require("mongoose-unique-validator");//its a plugin that simply add hook that check data befor saving

const userSchema =mongoose.Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}
  });
  userSchema.plugin(uniqueValidator);
  
  module.exports=mongoose.model('User',userSchema);




