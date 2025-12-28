const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

function createTodo(task) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    if(task.completed){
        li.classList.add('completed');
    }

    li.innerHTML = `
        <div class="custom-checkbox"></div>
        <span class="todo-text">${task.title}</span>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
    `;

    // --- Nút Tick
    const checkbox = li.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', () => {
        const newStatus = !li.classList.contains('completed');

        fetch(`http://localhost:3000/api/todos/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: newStatus })
        })
        .then(res => res.json())
        .then(upedatedTask => {
            if(upedatedTask.completed){
                li.classList.add('completed');
                completedList.appendChild(li);
            }
            else{
                li.classList.remove('completed');
                todoList.appendChild(li);
            }
        })
    });

    // --- Nút Sửa ---
    li.querySelector('.edit-btn').addEventListener('click', () => {
        const span = li.querySelector('.todo-text');
        const newTitle = prompt("Sửa công việc:", span.innerText);
        if (newTitle && newTitle.trim() !== "") {
            fetch(`http://localhost:3000/api/todos/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle.trim() })
            })
            .then(res => res.json())
            .then(updatedTask => {
                span.innerText = updatedTask.title;
                
            })

            span.innerText = newTitle.trim();
            task.title = newTitle.trim();
        }
    });

    // --- Nút Xóa ---
    li.querySelector('.delete-btn').addEventListener('click', () => {
        fetch(`http://localhost:3000/api/todos/${task.id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if(res.ok) li.remove();
        })
    });

    return li;
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== "") {
        fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: text })
        })
        .then(res => res.json())
        .then(newTask => {
            const newLi = createTodo(newTask);
            todoList.appendChild(newLi);
            input.value = "";
        })        
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

function loadTodos(){
    fetch('http://localhost:3000/api/todos')
    .then(res => res.json())
    .then(data => {
        todoList.innerHTML = "";
        completedList.innerHTML = "";
        data.forEach(task => {
            const li = createTodo(task);
            if (task.completed) {
                completedList.appendChild(li);
            } 
            else{
                todoList.appendChild(li);
            }
        })
    })
}

loadTodos();