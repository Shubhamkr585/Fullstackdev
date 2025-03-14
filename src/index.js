import mongoose  from "mongoose";
import {DB_NAME} from "./constants.js"
import express from "express"
 

import dotenv from "dotenv"
dotenv.config(){

}




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
