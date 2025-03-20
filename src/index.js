
// require('dotenv').config({path:'./.env'})

import dotenv from "dotenv"
import  connectDB  from "./db/index.js";
 
import app from "./app.js"


dotenv.config({
    path:"./.env"
})

connectDB().
then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`The app is running fast on the port ${process.env.PORT || 3000}`)
    })
}).
catch((error)=>{
    console.error("MONGODB CONNECTION FAILED ",error);
    process.exit(1);
    throw error
})




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
