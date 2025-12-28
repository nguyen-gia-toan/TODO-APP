const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todo = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

function createTodo(title){
    const task = {
        id: Date.now().toString(),
        title: title,
        completed: false
    }

    const li = document.createElement('li');
    li.className = 'todo-item';
    if(task.completed) li.classList.add('completed');



    li.innerHTML = `
        <div class = "custom-checkbox"></div>
        <span class =  "todo-text">${task.title}</span>
        <button class = "edit-btn">✏️</button>
        <button class = "delete-btn">🗑️</button>
    `;

    // Nut tick
    const checkbox = li.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', () => {
        const newStatus = !li.classList.contains('completed');
    })

    // Nut sua
    li.querySelector('.edit-btn').addEventListener('click', () => {
        const span = li.querySelector('.todo-text');
        const newTitle = prompt("Sửa công việc:", span.innerText);
        if(newTitle && newTitle.trim() !== ""){
            span.innerText = newTitle.trim();
            task.title = newTitle.trim();  
        }
    })

    // Nut xoa
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });
    return li;
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if(text !== ""){
        const newLi = createTodo(text);
        todoList.appendChild(newLi);
        input.value = "";
    }
});