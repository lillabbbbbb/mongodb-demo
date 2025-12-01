const message = document.createElement("p")

document.getElementById("todoForm").addEventListener("submit", async(event) => {
  event.preventDefault()

    const username = document.getElementById("userInput").value
    const item = document.getElementById("todoInput").value

    //return if either field is empty
    if(!username || !item) {
      console.log("Enter valid name and todo item.")
      return
    }
    
    try{
      const res = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username, todo: item
        })
      });

      const data = await res.json();
      console.log(data)
      message.innerText = data.message;
    }
    catch (error) {
      message.innerText = "Error adding todo.";
      console.error(error);
    }

    document.querySelector("div").appendChild(message)

    document.getElementById("userInput").value = ""
    document.getElementById("todoInput").value = ""
})

document.getElementById("searchForm").addEventListener("submit", async(event) => {
  event.preventDefault()
  
  const search = document.getElementById("searchInput").value
  
  //return if either field is empty
    if(!search) {
      console.log("Enter a valid ID.")
      return
    }

      const data = await (await fetch('http://localhost:3000/todos/' + search)).json()
      
      let items
      if(data.todos){
        items = data.todos.todos
        console.log("Received: " + items)
      }else{
        console.log("User not found")
        return
      }


      //empty list first
    while (document.getElementById("todoList").firstChild) {
      document.getElementById("todoList").removeChild(document.getElementById("todoList").firstChild);
    }


      //Display todos in an unordered list
      items.forEach(item => {
        let li = document.createElement("li")
        li.innerHTML = `<a class="delete-task" data-todo="${item}">${item}</a>`

        document.getElementById("todoList").appendChild(li)
      });

      //Delete todo
      let deleteButton = document.createElement("button")
      deleteButton.innerText = "Delete"
      deleteButton.setAttribute("id", "deleteUser")
      document.getElementById("div2").appendChild(deleteButton)
      deleteButton.addEventListener("click", async() => {
        const res = await fetch('http://localhost:3000/delete', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: search })
            });
        
        let data = await (await res.json())
        console.log(data)
          
      })


    document.querySelector("div").appendChild(message)

    document.getElementById("searchInput").value = ""

    document.getElementById("todoList").addEventListener("click", async(e) => {
      const clicked = e.target.closest('a.delete-task');
      if (!clicked) return;

      // Prevent default link behavior
      e.preventDefault();
      
      console.log(clicked.dataset.todo);
      
      let todo = e.target.dataset.todo
      console.log("You just tried to remove " + todo)

      const res = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: search, todo: todo })
      })

      console.log(await res.json)
    })

})