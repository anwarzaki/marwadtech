import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     mobile:{
        type:String,
        required:true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
        unique:true,
    },
     password:{
        type:String,
        required:true,
        minLength:6,
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;