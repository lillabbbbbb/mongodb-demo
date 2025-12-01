import express from "express";
import path from "path";
import router from "./src/routers/index.js";
import mongoose from "mongoose";
const app = express();
const port = 3000;
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
