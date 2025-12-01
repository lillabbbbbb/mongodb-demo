"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const express_1 = require("express");
const User_1 = require("./models/User");
const router = (0, express_1.Router)();
exports.Users = [];
//API endpoints
router.post("/add", (req, res) => {
    const name = req.body.name;
    const item = req.body.todo;
    console.log(item);
    //shortened the code with ChatGPT
    let user = exports.Users.find((u) => u.name === name);
    if (user) {
        user.todos.push(item);
    }
    else {
        user = {
            name: name,
            todos: [item]
        };
        exports.Users.push(user);
    }
    console.log("Sending message:", `Todo "${item}" added successfully for user ${name}. Their todos: ${user.todos}`); // debug
    res.json({ message: `Todo added successfully for user ${name}.` });
});
router.get("/todos/:id", async (req, res) => {
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
router.get("/todos/:id", (req, res) => {
    try {
        let id = req.params.id;
        let todos = exports.Users.find(user => user.name === id);
        if (!todos) {
            res.json({
                message: "User not found"
            });
        }
        res.json({
            todos: todos
        });
    }
    catch (error) {
        res.json({
            message: "User not found"
        });
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
router.put("/update", (req, res) => {
    let name = req.body.id;
    let todo = req.body.todo;
    console.log(exports.Users);
    exports.Users.forEach(user => {
        console.log("user.name: " + user.name + ", name: " + name);
        if (user.name === name) {
            console.log(user.todos);
            user.todos.forEach(item => {
                console.log("item: " + item + ", todo: " + todo);
                if (item === todo) {
                    user.todos.splice(user.todos.indexOf(todo));
                    console.log(user.todos);
                    res.send("Todo successfully removed");
                }
            });
        }
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map