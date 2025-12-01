import mongoose, { Schema } from "mongoose";
let todoSchema = new Schema({
    todo: { type: String, required: true },
    checked: { type: Boolean, default: false, required: false },
});
const Todo = mongoose.model("Todo", todoSchema);
let userSchema = new Schema({
    name: { type: String, required: true },
    todos: { type: [todoSchema], required: true },
});
const User = mongoose.model("User", userSchema);
export { Todo, User };
