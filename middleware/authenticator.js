const jwt = require("jsonwebtoken") 
const dotenv = require("dotenv");
dotenv.config()

function authenticator(req,res,next){

    const token = req.headers.authorization;

      jwt.verify(token, process.env.login_secret_token_key,(err,decode)=>{
        if(err)
            return res.send({
                message:"token is not valid please login"
            })
        
        if(decode){
            req.body.user = decode.userId
            next()
        }else{
            res.send({message:"token is valid please login"})
        }
    })
    
} 

module.exports={authenticator}