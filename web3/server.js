const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const mysql =  require('mysql2/promise');
const crypto = require('crypto');

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'Localhost',
    user: 'root',
    password: '05030503gtnn',
    database: 'todo_db'
})


//Get
app.get('/api/todos', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM todos');
        res.status(200).json(rows);
    }
    catch(error){
        res.status(500).json({message: error.message} );
    }
});

//Post
app.post('/api/todos', async (req, res) => {
    const {title} = req.body;
    if(!title || title.trim() === ""){
        return res.status(400).json({message: "Không có công việc để thêm"})
    }
    try{
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const [result] = await pool.query('INSERT INTO todos (id, title, createdAt) VALUES (?, ?, ?)', [id, title, createdAt]);
        const newTodo = {
            id: id,
            title: title.trim(),
            completed: false,
            createdAt: createdAt
        };
        res.status(201).json(newTodo);
    }
    catch(error){
        res.status(500).json({message: error.message} );
    }
});

//Put
app.put('/api/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {title, completed} = req.body;
    try{
        if(completed !== undefined){
            await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
        }

        if(title !== undefined){
            await pool.query('UPDATE todos SET title = ? WHERE id = ?', [title, id]);
        }
        res.status(200).json({id, title, completed});
    }
    catch(error){
        res.status(500).json({message: error.message} );
    }
});



//Delete
app.delete('/api/todos/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await pool.query('DELETE FROM todos WHERE id = ?', [id]);
        res.status(204).send();
    }
    catch(error){
        res.status(500).json({message: error.message} );
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});