"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../app");
const router = (0, express_1.Router)();
//API endpoints
router.post("/add", (req, res) => {
    const name = req.body.name;
    const item = req.body.todo;
    console.log(item);
    //shortened the code with ChatGPT
    let user = app_1.Users.find((u) => u.name === name);
    if (user) {
        user.todos.push(item);
    }
    else {
        user = {
            name: name,
            todos: [item]
        };
        app_1.Users.push(user);
    }
    console.log("Sending message:", `Todo "${item}" added successfully for user ${name}. Their todos: ${user.todos}`); // debug
    res.json({ message: `Todo added successfully for user ${name}.` });
});
router.get("/todos/:id", (req, res) => {
    let id = req.params.id;
    let todos = app_1.Users.find(user => user.name === id);
    console.log(todos);
    try {
        res.send({
            todos: todos
        });
    }
    catch (error) {
        res.send({
            message: "User not found"
        });
        console.error("User not found");
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map