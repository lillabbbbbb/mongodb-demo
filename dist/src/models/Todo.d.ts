import mongoose, { Document } from "mongoose";
interface ITodo extends Document {
    user: string;
    todos: String[];
}
declare const Todo: mongoose.Model<ITodo>;
export { Todo, ITodo };
//# sourceMappingURL=Todo.d.ts.map