const express = require ("express")
const { authenticator } = require("../middleware/authenticator")
const { NoteModel } = require("../models/noteModes")
const noteRouter = express.Router()
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()



noteRouter.use(authenticator)

noteRouter.get("/",(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.login_secret_token_key,async(err,decode)=>{
        try {
            let data = await NoteModel.find({user:decode.userId})
        res.send({
            data:data,
            message:"success",
            status:1
        })
        
        } catch (error) {
            res.send({
                status:0,
                message:error.message
            }) 
        }
    })


    // res.send({message : "note router page"})
})

noteRouter.post("/create",async(req,res)=>{
    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({message:"notes creates well",
    status:1
})

    } catch (error) {
        res.send(error)
    }
})


noteRouter.patch("/update",async(req,res)=>{
    let {id} = req.headers
    try{
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.send({
                message:" note updated",
                status:1
            })


    } catch(error){
        res.send({message:error.message,status:0})
    }
})



noteRouter.delete("/delete",async(req,res)=>{
    let {id} = req.headers
    try{
        await NoteModel.findByIdAndDelete({_id:id})
            res.send({
                message:" note deleted",
                status:1
            })


    } catch(error){
        res.send({message:error.message})
    }
})



module.exports={noteRouter}