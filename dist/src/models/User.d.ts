import mongoose, { Document } from "mongoose";
interface ITodo extends Document {
    todo: string;
    checked: boolean;
}
declare const Todo: mongoose.Model<ITodo>;
interface IUser extends Document {
    name: string;
    todos: ITodo[];
}
declare const User: mongoose.Model<IUser>;
export { Todo, User, ITodo, IUser };
//# sourceMappingURL=User.d.ts.map