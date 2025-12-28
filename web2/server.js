const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs').promises;
const cors = require('cors');
const DATA_FILE = './data.json';
app.use(express.json());
app.use(cors());

async function readData(){
    try{
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch(error){
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2))
        return [];
    }
}

async function writeData(todos){
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

//Get
app.get('/api/todos', async (req, res) => {
    const todos = await readData();
    res.status(200).json(todos);
});

//Post
app.post('/api/todos', async (req, res) => {
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
    const todos = await readData();
    todos.push(newTodo);
    await writeData(todos);
    res.status(201).json(newTodo);
});

//Put
app.put('/api/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {title, completed} = req.body;

    let todos = await readData();
    const todo = todos.find(item => item.id === id);

    if(!todo){
        return res.status(404).json({message: "Không tìm thấy công việc"});
    }

    if(title !== undefined) todo.title = title;
    if(completed !== undefined) todo.completed = completed;
    await writeData(todos);
    res.status(200).json(todo);
});



//Delete
app.delete('/api/todos/:id', async (req, res) => {
    const {id} = req.params;
    let todos = await readData();
    todos = todos.filter(item => item.id !== id);
    const check = todos.find(item => item.id === id);
    if(!check){
        await writeData(todos);
        res.status(204).send();
    }
    else{
        res.status(404).json({message: "Không tìm thấy công việc để xóa"});
    }
})

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});