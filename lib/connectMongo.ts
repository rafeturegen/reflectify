import mongoose from "mongoose"

export default async function connectMongo(){

    const uri = process.env.MONGO_URI as string;
    try {
        await mongoose.connect(uri)
        console.log("Connected to Mongo")
    } catch (error) {
        throw new Error("Couldn't connect Mongo.")
    }

}