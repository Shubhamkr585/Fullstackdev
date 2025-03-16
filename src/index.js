
// require('dotenv').config({path:'./.env'})

import dotenv from "dotenv"
import  connectDB  from "./db/index.js";
 



dotenv.config({
    path:"./.env"
})

connectDB()




/*
const app=express()

(async (params) => {
    try{
   await mongoose.connect(`${process.env.MONGO_URI}/{DB_NAME}`)
   app.on("error",(error)=>{
    console.log("error : ",error)
    throw error
   })

   app.listen(process.env.PORT,()=>{
       console.log("The app is running on the port ${process.env.PORT}")
   })
    }
    catch{
        console.error("error ",error)
        throw error
    }
    
})

*/
