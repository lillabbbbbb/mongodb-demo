import {Request, Response, Router} from "express"
import { parse } from "path"
import fs from "fs"

const router : Router = Router()


export type TUser = {
    name : string;
    todos : string[]
}

export let Users : TUser[] = []

fs.readFile("data.json", "utf8", (err:NodeJS.ErrnoException | null, data: string) => {
    if(err){
        console.log(err)
    }

    try{
        Users = JSON.parse(data)
    }catch(error: any){
        console.log(`Error parsing JSON: ${error}`)
    }
})

//API endpoints

router.post("/add", (req: Request, res : Response) => {
    const name = req.body.name
    const item = req.body.todo
    console.log(item)

    //shortened the code with ChatGPT
    let user = Users.find((u) => u.name === name);

    if (user){
        user.todos.push(item)
    }
    else{
        user = {
            name: name,
            todos: [item]
        }
        Users.push(user)
    }

    console.log("Sending message:", `Todo "${item}" added successfully for user ${name}. Their todos: ${user.todos}`); // debug
    res.json({message: `Todo added successfully for user ${name}.`})
})

router.get("/todos/:id", (req: Request, res : Response) => {

    try{
        let id : string = req.params.id!

        let todos = Users.find(user => user.name === id)

        if(!todos){
            res.json({
                message: "User not found"
            })
        }

        res.json({
            todos: todos
        })
    }catch(error: any){
        res.json({
            message: "User not found"
        })
    }

})

console.log("REGISTERING DELETE ROUTE");

router.delete("/delete", (req: Request, res : Response) => {
    const id = req.body.id
    console.log("ID: " + id)
    let message : string = "User not found."

    if (id){
        for(let i = 0; i < Users.length; i++){
            if (Users[i]!.name === id){
                console.log("Removing user " + Users[i]!.name + " and their notes.")
                Users.splice(i, 1)
                console.log("Users left: " + Users)
                message = "User deleted successfully."
                break
            }
        }
    }
    res.send(message)


})

router.put("/update", (req: Request, res : Response) => {
    let name = req.body.id
    let todo = req.body.todo

    console.log(Users)
    Users.forEach(user => {
        console.log("user.name: " + user.name + ", name: " + name)
        if(user.name === name){
            console.log(user.todos)
            user.todos.forEach(item => {
                console.log("item: " + item + ", todo: " + todo)
                if(item === todo){
                    user.todos.splice(user.todos.indexOf(todo))
                    console.log(user.todos)
                    res.send("Todo successfully removed")
                }
            });

        }
    })
})

export default router