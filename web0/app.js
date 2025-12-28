const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');


function createTodo(title) {
    const task = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    const li = document.createElement('li');
    li.className = 'todo-item';

    li.innerHTML = `
        <div class="custom-checkbox"></div>
        <span class="todo-text">${task.title}</span>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
    `;

    // --- Nút Tick
    const checkbox = li.querySelector('.custom-checkbox');
    checkbox.addEventListener('click', () => {
        li.classList.toggle('completed');
        
        if (li.classList.contains('completed')) {
            completedList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });

    // --- Nút Sửa ---
    li.querySelector('.edit-btn').addEventListener('click', () => {
        const span = li.querySelector('.todo-text');
        const newTitle = prompt("Sửa công việc:", span.innerText);
        if (newTitle && newTitle.trim() !== "") {
            span.innerText = newTitle.trim();
            task.title = newTitle.trim();
        }
    });

    // --- Nút Xóa ---
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    return li;
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== "") {
        const newLi = createTodo(text);
        todoList.appendChild(newLi);
        input.value = "";
    }
});