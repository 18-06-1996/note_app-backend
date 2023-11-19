const express = require ("express")
const dotenv = require("dotenv");
dotenv.config()
const { userRouter } = require("./routes/user_routes");
const cors =require("cors");
const { connection } = require("./db");
const { noteRouter } = require("./routes/note_routes");

const port = process.env.PORT
const app = express();




app.get("/", (req,res)=>{
    res.send({
        message:"server working well"
    })
})

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/note",noteRouter)


app.listen(port, async()=>{
try {
    await connection
    console.log("database connected")
} catch (error) {
    console.log(error)
}   

   console.log("server is running on port number ", port)
})


