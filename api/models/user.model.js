import mongoose from 'mongoose';
// const Schema={mongoose} 

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String
    } ,
    coverImage:{
        type:String
    } ,
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    }},
    {
    timestamps:true
    
}); 

export default mongoose.model("User",userSchema)