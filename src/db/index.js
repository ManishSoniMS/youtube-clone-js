import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    console.log("mongo db url:  ", process.env.MONGODB_URI);
    console.log("mongo db name:  ", DB_NAME);
    try {
        const connectInstance =
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB Host: ${connectInstance.connection.host}`);
    } catch (e) {
        console.log("mongoDB connect failed: ", e);
        process.exit(1); // read more about exit
    }
}

export default connectDB