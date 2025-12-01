"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
exports.Users = [];
//API endpoints
router.post("/add", async (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo;
    try {
        const existingTodo = await User_1.Todo.findOne({ todo: req.body.todo });
        if (existingTodo) {
            console.log("This todo already exists");
            return res.status(403).json("Todo already exists");
        }
        //create new todo record
        const todo = new User_1.Todo({
            todo: req.body.todo
        });
        await todo.save();
        console.log("New todo saved!");
        const existingUser = await User_1.User.findOne({ name: req.body.name });
        if (!existingUser) {
            //create new user with this todo
            const user = new User_1.User({
                name: req.body.name,
                todos: [todo],
            });
            await user.save();
            console.log("New user saved!");
            return res.status(201).json({ message: "New user saved successfully" });
        }
        //otherwise
        existingUser.todos.push(todo);
        existingUser.save();
        console.log("Sending message:", `Todo "${todo}" added successfully for user ${name}. Their todos: ${existingUser.todos}`); // debug
        res.json({ message: `Todo added successfully for user ${name}.` });
    }
    catch (error) {
        console.error(`Error while saving user: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get("/todos", async (req, res) => {
    try {
        const users = await User_1.User.find();
        if (!users) {
            return res.status(404).json({ message: "No poems found" });
        }
        res.json({
            users
        });
    }
    catch (error) {
        console.log(`Error while fetching users: ${error}`);
        res.status(500).json("Internal server error");
    }
});
router.get("/todos/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User_1.User.findOne({ name: id });
        if (!user) {
            return res.status(404).json({ message: "Poem not found" });
        }
        res.json({
            user
        });
    }
    catch (error) {
        console.log(`Error while fetching users: ${error}`);
        res.status(500).json("Internal server error");
    }
});
console.log("REGISTERING DELETE ROUTE");
router.delete("/delete", (req, res) => {
    const id = req.body.id;
    console.log("ID: " + id);
    let message = "User not found.";
    if (id) {
        for (let i = 0; i < exports.Users.length; i++) {
            if (exports.Users[i].name === id) {
                console.log("Removing user " + exports.Users[i].name + " and their notes.");
                exports.Users.splice(i, 1);
                console.log("Users left: " + exports.Users);
                message = "User deleted successfully.";
                break;
            }
        }
    }
    res.send(message);
});
router.put("/update", async (req, res) => {
    let name = req.body.id;
    let todo = req.body.todo;
    const user = await User_1.User.findOne({ name: name });
    if (!user) {
        return res.status(500).json(`User ${name} not found`);
    }
    for (let i = 0; i < user.todos.length; i++) {
        console.log(user.todos);
        if (user.todos[i]?.todo === todo) {
            //used ChatGPT for the code snippets below
            user.todos.splice(i, 1);
            let id = user.todos[i]?._id;
            const todo = await User_1.Todo.findOneAndDelete(id);
            await todo?.save();
            await user.save();
            console.log();
            return res.json(`Todo "${todo}" successfully deleted for user "${name}"`);
        }
    }
});
router.put("/updateTodo", async (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    let checked = req.body.checked;
    const user = await User_1.User.findOne({ name: name });
    if (!user) {
        return res.status(500).json(`User ${name} not found`);
    }
    for (let i = 0; i < user.todos.length; i++) {
        console.log(user.todos);
        let id = user.todos[i]?._id;
        if (user.todos[i]?.todo === todo) {
            user.todos[i]?.updateOne({ _id: id }, { $set: { checked: !checked } });
            await user.save();
            console.log("Tod ");
            return res.json(`Todo "${todo}" is now checked: ${!checked}`);
        }
    }
});
exports.default = router;
