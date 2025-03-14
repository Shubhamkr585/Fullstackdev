import mongoose from "mongoose"

import {DB_NAME} from '../constants'

const connectDB=async()=>{
    try{
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       console.log("Database connected !! DB HOST  ${connectionInstance.connection.host} DB NAME ${connectionInstance.connection.name}")
    }
    catch(error){
        console.error("MONGODB CONNECTION ERROR",error);
        process.exit(1);
        throw error
    }
}

export default connectionDB