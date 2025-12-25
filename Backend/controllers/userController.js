import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

const register = async(req,res) =>{
     const {name,mobile,password} = req.body;
     try{
       if(!name || !mobile || !password){
        return res.status(401).json({message:"please fill the required details"});
       }

       const existingUser = await User.findOne({mobile});
       if(existingUser){
         return res.status(409).json({
                message: "Mobile number already registered",
           });
       }

       const hashedPassword = await bcrypt.hash(password,10);

       await User.create({name,mobile: String(mobile),password:hashedPassword});

       res.status(201).json({status:201,message:"user created successfully"});
     } catch(e){
       res.status(500).json({status:500,message:"something went wrong",e});
       console.log(e);
     }
}

const login = async(req,res) =>{
     const {mobile,password} = req.body;
     try{
       if(!mobile || !password){
        return res.status(401).json({message:"please fill the required details"});
       }

       const existingUser = await User.findOne({mobile});

       if(!existingUser){
         return res.status(401).json({
                message: "Not registered,please register",
           });
       }

       const isMatch = await bcrypt.compare(password,existingUser.password);

       if(!isMatch){
        return res.status(404).json({
                message: "password is wrong,try again",
           });
       }

       const token = jwt.sign(
                        {name:existingUser.name,id: existingUser._id,},
                        process.env.JWT_SECRET,
                        {expiresIn:"1h"}
                    )

       res.status(201).json({status:200,message:"user login successfully",token:token});
     } catch(e){
       res.status(500).json({status:500,message:"something went wrong",e});
       console.log(e);
     }
}
export {register,login};