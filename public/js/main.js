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
      console.log(data)
      
      let items
      if(data.user.todos){
        items = data.user.todos
        console.log("Received: ")
        console.log(items)
      }else{
        console.log("User not found")
        return
      }




      //empty list first
    while (document.getElementById("todoList").firstChild) {
      document.getElementById("todoList").removeChild(document.getElementById("todoList").firstChild);
    }


      //Display todos in an unordered list
      items.forEach(elem => {
        let li = document.createElement("li")
        li.innerHTML = `
            <input type="checkbox" id="myCheckBox" class="checkBoxes" name="vip" id="vip">
            <span>
              <a class="delete-task" href="#" data-todo="${elem.todo}">${elem.todo}</a>
            </span>
        `

        document.getElementById("todoList").appendChild(li)
        
        let checkbox = document.getElementById("myCheckBox")
        checkbox.checked = elem.checked

        checkbox.addEventListener("click", async(e) => {
          console.log("Checkbox clicked")
          let name = search
          let todo = elem.todo
          let checked = e.target.checked
          console.log("name: " + name + ", todo: " + todo + ", checked: " + checked)

          const res = await fetch("http://localhost:3000/updateTodo", {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, todo: todo, checked: checked})
          })
          console.log(await res.json())
        })

      });

    document.querySelector("div").appendChild(message)

    document.getElementById("todoList").addEventListener("click", async(e) => {
      const clicked = e.target.closest('a.delete-task');
      if (!clicked) return;

      // Prevent default link behavior
      e.preventDefault();
      
      console.log(clicked.dataset.todo);
      
      let todo = clicked.innerText
      console.log("You just tried to remove " + todo)

      const res = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: search, todo: todo })
      })

      console.log(await res.json())
    })

    
    document.getElementById("searchInput").value = ""

})