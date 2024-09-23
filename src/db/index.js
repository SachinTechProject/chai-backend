
import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB = async () => {
    try{
     const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })
       console.log(`\n MongoDb connect !! DB HOST: ${connectionInstance.connection.host} `)
    }catch(error){
        console.log("MONGODB connection error",error)
        process.exit(1)
    }
}


export default connectDB