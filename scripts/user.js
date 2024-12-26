



// Check if the user's name is already saved in localStorage
function checkUserName() {
    if (!localStorage.getItem('userName')) {
        // If not, ask the user for their name
        let userName = prompt("Welcome to the To-Do App! Please enter your preferred name:");
        
        // Store the name in localStorage
        if (userName) {
            localStorage.setItem('userName', userName);
        }
    }    
}




// display inst to the user

function checkToDoListAndGreet(tasks) {
    let greetingMessage = document.getElementById('greeting-message');
    let userName = localStorage.getItem('userName');
    // Check if a to-do list exists in localStorage
    if (tasks.length === 0) {
        // Check if userName is available before using it
        if (userName) {
            greetingMessage.innerHTML = ` Hi, ${userName}. Let's create your first to-do List for today`;
            // If there is no to-do list, ask the user to create one
            alert(`WELCOME ${userName}, Let's create your first to-do List.`);
        } else {
            greetingMessage.innerHTML = `Hi, Let's create your first to-do List for today`;
            alert(`WELCOME, Let's create your first to-do List.`);
        }
    } else {
        // If the to-do list exists, display the personalized greeting
        if (userName) {
            greetingMessage.innerHTML = ` What's up, ${userName}? Time to conquer your To-Do List like a boss! 👑`;
        } else {
            greetingMessage.innerHTML = `Welcome back! Time to conquer your To-Do List like a boss! 👑`;
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    

    checkUserName();
    checkToDoListAndGreet(tasks);


    const todoInput = document.getElementById("todo-Input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    tasks.forEach( task => renderTasks(task));


    addTaskButton.addEventListener('click', function(){
        const taskText = todoInput.value.trim();

        if(taskText === "") return;

        const newTask = {
            id : Date.now(),
            text: taskText,
            isCompleted : false
        }

        tasks.push(newTask);

        //Saving the every new task
        saveTasks();
        renderTasks(newTask);
        todoInput.value = "" // clearing the input
        console.log(tasks)

    })

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(task) {
        console.log(task.text);
    
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
    
        // Add Tailwind CSS classes to the <li> element
        li.classList.add(
            'bg-gradient-to-r', 
            'from-teal-500', 
            'to-blue-500', 
            'p-4', 
            'rounded-lg', 
            'flex', 
            'justify-between', 
            'items-center', 
            'w-full', 
            'shadow-md', 
            'hover:shadow-xl', 
            'transition-shadow', 
            'duration-200', 
            'ease-in-out'
        );
    
        // Add a class if the task is completed
        if (task.isCompleted) {
            li.classList.add('completed');
        }
    
        // Set the inner HTML content
        li.innerHTML = `
            <span class="text-white font-semibold">${task.text}</span>
            <button class="bg-red-600 p-2 rounded-md text-white hover:bg-red-500 transition-all duration-200 ease-in-out">Delete</button>
        `;
    
        // Event listener for task toggle (completed/incomplete)
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle('isCompleted');
        });
    
        // Event listener for the delete button
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents event bubbling and stops the task toggle from firing
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });
    
        // Append the <li> to the todo list
        todoList.appendChild(li);
    }
    


})

