import mongoose from "mongoose"

export const connectDB = async () =>{
      try {
            await mongoose.connect(`${process.env.MONGODB_URL}/nextapp`)
            mongoose.connection.on("connected",()=>{
                  console.log("Mongo db connected ")
            })
            mongoose.connection.on("error",(err)=>{
                  console.log("Mongo db conection failed ",err)
                  process.exit()
            })
      } catch (error) {
            console.log("Something went wrong to connecting DB",error.message)
      }
}