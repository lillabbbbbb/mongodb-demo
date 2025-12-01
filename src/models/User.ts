import mongoose, {Document, Schema } from "mongoose"

interface ITodo extends Document{
    todo: string
}
let todoSchema : Schema = new Schema<ITodo>({
    todo: {type : String, required : true}
})

const Todo: mongoose.Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema)



interface IUser extends Document{
    name: string,
    todos: ITodo[]
}
let userSchema : Schema = new Schema<IUser>({
    name: {type : String, required : true},
    todos: {type : [todoSchema], required : true},
})
const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema)


export {Todo, User, ITodo, IUser}