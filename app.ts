import express, {Express} from "express"
import { constants } from "buffer" 
import path from "path"
import router from "./src"
import fs from "fs"
import mongoose, { Connection } from "mongoose"


const app: Express = express()
const port = 3000

const mongoDB: string = "mongodb://127.0.0.1:27017/poemdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})