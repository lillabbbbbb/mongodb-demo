import mongoose, {Document, Schema } from "mongoose"

interface ITodo {
    todo: string
}
let todoSchema : Schema = new Schema({
    todo: {type : String, required : true}
})

const Todo: mongoose.Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema)



interface IUser extends Document{
    name: string,
    todos: ITodo[]
}
let userSchema : Schema = new Schema({
    name: {type : String, required : true},
    todos: {type : Todo, required : true},
})
const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema)


export {Todo, User, ITodo, IUser}