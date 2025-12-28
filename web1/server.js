const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

let todos = [];

//Get
app.get('/api/todos', (req, res) => {
    res.status(200).json(todos);
});

//Post
app.post('/api/todos', (req, res) => {
    const {title} = req.body;

    if(!title || title.trim() === ""){
        return res.status(400).json({message: "Không có công việc để thêm"})
    }

    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//Put
app.put('/api/todos/:id', (req, res) => {
    const {id} = req.params;
    const {title, completed} = req.body;

    const todo = todos.find(item => item.id === id);

    if(!todo){
        return res.status(404).json({message: "Không tìm thấy công việc"});
    }

    if(title !== undefined) todo.title = title;
    if(completed !== undefined) todo.completed = completed;

    res.status(200).json(todo);
});



//Delete
app.delete('/api/todos/:id', (req, res) => {
    const {id} = req.params;
    
    todos = todos.filter(item => item.id !== id);
    const check = todos.find(item => item.id === id);
    if(!check){
        res.status(204).send();
    }
    else{
        res.status(404).json({message: "Không tìm thấy công việc để xóa"});
    }
})

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});