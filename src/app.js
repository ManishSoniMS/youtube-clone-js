import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/// Config

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// set the data timit
app.use(express.json({ limit: "16kb" }));

// set the url encoded parameter
// e.g., https://www.google.com/search?q=manish+soni&oq=manish+soni
// in the above url, manish soni is encoded as manish+soni
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

export default app;