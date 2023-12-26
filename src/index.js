import connectDB from "./db/index.js";
import app from "./app.js";

// initialize env, as per docs
// ref: https://www.npmjs.com/package/dotenv?activeTab=readme#:~:text=As%20early%20as%20possible%20in%20your%20application%2C%20import%20and%20configure%20dotenv%3A
//
// require('dotenv').config({ path: './env' });

// initialize env, to maintain the consistancy
// to make this work we have to append our run command, since it is an experimental feature
// "nodemon -r dotenv/config --experimental-json-modules src/index.js"
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

/*
/// Approach 1, how to connect db

// iffy statement
// syntex, ( () => { } )()
// it means execute the function immidiately
(async () => {

    console.log("mongo db url: - index.js  ", process.env.MONGODB_URI);
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (e) => {
            console.log("ERROR: ", e);
            throw e;
        });

        app.listen(process.env.PORT, () => {
            console.log(`app is listing on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log("ERROR: ", e);
        throw e;
    }
})();
*/

/// Approach 2, How to connect d, professional
connectDB().then(() => {
    const port = process.env.PORT || 8000;

    app.on("ERROR", (e) => {
        console.log("Error : ", e);
        throw e;
    });

    app.listen(port, () => {
        console.log("Server is running at port ", port);
    });
}).catch((e) => {
    console.log("MongoDB connection failed!!", e);
});
