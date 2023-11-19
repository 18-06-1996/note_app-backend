const express = require ("express")
const bcrypt =require("bcrypt")
const { UserModel } = require("../models/userModes")
const userRouter = express.Router()
const dotenv = require("dotenv");
dotenv.config()
const jwt = require("jsonwebtoken")



userRouter.get("/",(req,res)=>{
   res.send({
    message:"user page"
   })
})



userRouter.post("/register",async(req,res)=>{
    
    const {name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    try {
       
        let user = new UserModel({
            name:name,
            email:email,
            password:hashedPassword,
            
        });
        await user.save()

        res.status(200).send({
    message : "user Created successfully...",user,
    status:1
})

    } catch (error) {
        console.log(error)
    }
})




userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    try {
        let data= await UserModel.find({email});
        if(data.length>0){
           let token =  jwt.sign({userId:data[0]._id},process.env.login_secret_token_key,{expiresIn:"60m"})
            bcrypt.compare(password,data[0].password,function(err,result){
               if(err) return res.send({message:"something went wrong:"+err,status:0})
                if (result) {
                    res.send({message:"user login successfull",
                    token:token,
                    status:1})
                }else{
                            res.send({mssage:"incorrect password",
                        status:0})
                }
            })
        }else{
            res.send({message:"user does not exist"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports={userRouter}