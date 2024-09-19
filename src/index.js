import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 2000, () => {
        console.log(`Server is running at post : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongod db conntetion faild !!! ", err)
})