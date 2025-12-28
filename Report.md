- Level 0: Simple Frontend:
	- Ý tưởng:
		- Tạo ra trang web có ô để nhập nội dung công việc và 2 cột là "đang làm" và "đã hoàn thành"
		- Sau khi nhập xong thì công việc sẽ được thêm vào một ô hình chữ nhật ở cột "đang làm" với 1 ô hình tròn để tick vào ở bên trái và 2 nút chỉnh sửa và xóa ở bên phải
			- Khi bấm vào ô hình tròn thì ô công việc sẽ được chuyển sang cột "đã hoàn thành"
			- Khi bấm vào nút sửa thì sẽ xuất hiện một ô để nhập nội dung mới vào
			- Khi bấm vào nút xóa thì ô công việc sẽ biến mất
	- Ban đầu em tạo ra các thành phần cơ bản của trang web trong file index
		-
		  ```htmlmixed
		  <!DOCTYPE html>
		  <html lang="vi">
		  <head>
		      <meta charset="UTF-8">
		      <title>Todo App</title>
		  </head>
		  <body>
		      <div class = 'container'> 
		          <h1>Todo List</h1>
		          <!-- Tạo ô để nhập nội dung công việc và nút thêm -->
		          <div class = 'input-section'>
		              <input type = 'text' id = 'todo-input' placeholder = 'Bạn cần làm gì?'>
		              <button id = 'add-btn'>Thêm</button>
		          </div>
		          <!-- Thêm 2 cột đang làm và đã hoàn thành -->
		          <div class = 'main-content'>
		              <div class = 'column'>
		                  <h2>Đang làm</h2>
		                  <ul id="todo-list"></ul>
		              </div>
		              <div class = 'column'>
		                  <h2>Đã hoàn thành</h2>
		                  <ul id="completed-list"></ul>
		              </div>
		          </div>
		      </div>
		  </body>
		  </html>
		  ```
	- Sau đó chuyển qua code file app.js để làm phần thêm nội dung công việc
		-
		  ```javascript
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
		  
		      //Tick
		      const checkbox = li.querySelector('.custom-checkbox');
		      checkbox.addEventListener('click', () => {
		          li.classList.toggle('completed');
		          
		          if (li.classList.contains('completed')) {
		              completedList.appendChild(li);
		          } else {
		              todoList.appendChild(li);
		          }
		      });
		  
		      //Sửa
		      li.querySelector('.edit-btn').addEventListener('click', () => {
		          const span = li.querySelector('.todo-text');
		          const newTitle = prompt("Sửa công việc:", span.innerText);
		          if (newTitle && newTitle.trim() !== "") {
		              span.innerText = newTitle.trim();
		              task.title = newTitle.trim();
		          }
		      });
		  
		      //Xóa
		      li.querySelector('.delete-btn').addEventListener('click', () => {
		          li.remove();
		      });
		  
		      return li;
		  }
		  //Thêm
		  addBtn.addEventListener('click', () => {
		      const text = input.value.trim();
		      if (text !== "") {
		          const newLi = createTodo(text);
		          todoList.appendChild(newLi);
		          input.value = "";
		      }
		  });
		  ```
			- Trong quá trình code thì em có tra Gemini làm sao để tạo uuid, làm các nút thêm, tick, sửa, xóa hoạt động và học được cú pháp DOM listener, createElement, appendChild
		- Sau đó thêm dòng này vào trong body của index
			-
			  ```htmlmixed
			  <script src="app.js"></script>
			  ```
	- Làm thêm file style.css để app đẹp hơn
		-
		  ```css
		  body{
		      background-color: #1f1f1f;
		      color: #e0e0e0;
		      font-family: tahoma, 'Segoe UI', sans-serif;
		      display: flex;
		      justify-content: center;
		      padding: 20px;
		  }
		  
		  .container{
		      width: 900px;
		  }
		  
		  .input-section{
		      display: flex;
		      margin-bottom: 30px;
		      justify-content: center;
		  }
		  
		  input{
		      width: 300px;
		      padding: 15px;
		      background: #2c2c2c;
		      border: 1px solid #444;
		      color: white;
		      border-radius: 10px 0 0 10px;
		  }
		  
		  #add-btn{
		      padding: 15px 25px;
		      background: #71df75;
		      color: white;
		      border: none;
		      border-radius: 0 10px 10px 0;
		      cursor: pointer;
		  }
		  
		  .main-content{
		      display: flex;
		      gap: 20px;
		  }
		  
		  .column{
		      flex: 1;
		      background: #2a2a2a;
		      padding: 15px;
		      border-radius: 12px;
		      min-height: 400px;
		  }
		  
		  ul{
		      list-style: none;
		      padding: 0;
		  }
		  
		  .todo-item{
		      display: flex;
		      align-items: center;
		      background: #333333;
		      border: 1px solid #444;
		      padding: 15px;
		      margin-bottom: 12px;
		      border-radius: 10px;
		  }
		  
		  .custom-checkbox{
		      width: 20px;
		      height: 20px;
		      border: 2px solid #4CAF50;
		      border-radius: 50%;
		      margin-right: 15px;
		      cursor: pointer;
		      display: flex;
		      align-items: center;
		      justify-content: center;
		      transition: 0.3s;
		  }
		  
		  .completed .custom-checkbox {
		      background-color: #4CAF50;
		  }
		  .completed .custom-checkbox::after {
		      content: '✓';
		      color: white;
		      font-size: 14px;
		  }
		  
		  .todo-text { 
		      flex-grow: 1; 
		      font-size: 16px;
		  }
		  
		  .edit-btn, .delete-btn{
		      background:  none;
		      border: none;
		      cursor: pointer;
		      font-size: 18px;
		      margin-left: 10px;
		  }
		  ```
			- Trong quá trình làm phần này thì em có tra cách để thêm dấu '✓' vào nút tick tròn khi bấm vào (::after)
		- Và thêm dòng này vào phần head của index.html
			-
			  ```htmlmixed
			  <link rel="stylesheet" href="style.css">
			  ```
		-
- Level 1: In-Memory Storage
	- Tạo thêm một file là server.js
		- Status code của RESTful api
			- ![Status code request RESTful API](https://static.vietnix.vn/wp-content/uploads/2022/04/Status-code-request-RESTful-API.webp)
			-
		- Dùng express framework để thực hiện các hành động get, put, delete, post và cho server chạy ở cổng 3000  và tạo mảng todos để lưu dữ liệu
			-
			  ```javascript
			  const express = require('express');
			  const app = express();
			  const PORT = 3000;
			  app.use(express.json());
			  
			  let todos = []; //đây là mảng dùng để lưu danh sách công việc
			  ```
		- Các API Put, Post, Get, Delete
			-
			  ```javascript
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
			  
			  //khởi động server chạy ở cổng 3000 (nhận yêu cầu được gửi lên cổng 3000)
			  app.listen(PORT, () => {
			      console.log(`Server đang chạy tại: http://localhost:${PORT}`);
			  });
			  ```
				- Em có hỏi gemini về cú pháp, cách để viết 1 api
				-
	- Sửa lại file app.js để gửi yêu cầu và nhận phản hồi từ server (em có thêm chức năng nếu bấm nút enter thì nút thêm sẽ được nhấn để việc nhập công việc sẽ tiện hơn)
		-
		  ```javascript
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
		  
		      //Tick
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
		  
		      //Sửa
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
		  
		      // Xóa
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
		  // Thêm
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
		  
		  //Lấy dữ liệu khi tải lại trang
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
		  ```
	- Khi làm phần này em có gặp các lỗi
		- Lỗi đã khởi động server rồi nhưng web vẫn không hoạt động được
			- Em có tìm hiểu thì biết đó là lỗi cors nghĩa là trang web không được phép kết nối tới server
			- Và cách khắc phục là viết thêm dòng này vào đầu server để cho biết là tất cả trang web đều được phép kết nối tới server
				-
				  ```javascript
				  const cors = require('cors');
				  app.use(cors());
				  ```
			- Còn một vài lỗi mà em không nhớ🥲
- Level 2: File-based Persistence
	- Theo em hiểu thì async sẽ cho biết là trong hàm này sẽ có các công việc mà phải chờ kết quả rồi mới được làm tiếp các công việc tiếp theo trong chu trình (await) nhưng trong quá trình chờ thì vẫn có thể thực hiện các chu trình tiếp theo và sau khi công việc đó có kết quả rồi thì quay lại thực hiện nốt các công việc còn lại trong 1 chu trình
	- Sửa lại file server để đọc và viết dữ liệu file data.JSON (dùng fs để hỗ trợ việc đọc và viết file). Thay vì lưu trên mảng todos thì ta sẽ lưu trên file data.JSON để có thể dễ dàng truy xuất và ghi dữ liệu hơn nữa khi tắt server thì dữ liệu sẽ không bị mất
		- Hàm try catch ở phần readData sẽ có tác dụng: nếu việc đọc file bị lỗi thì sẽ xóa sạch nội dung trong file và để lại mảng trống sau đó trả về giá trị mảng trống để sau này có thể lưu trữ dữ liệu khác mà không bị lỗi.
		-
		  ```javascript
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
		  ```
- Level 3: Database Integration
	- Tải MySQL và thư viện mysql2 và tạo bảng
		- Em có nhờ gemini để giúp tạo bảng bằng code và ôn lại một số lệnh truy xuất dữ liệu
			- CREATE TABLE todos (
			      id VARCHAR(36) PRIMARY KEY,   
			      title VARCHAR(255) NOT NULL,  
			      completed BOOLEAN DEFAULT FALSE,  
			      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
			  );  
	- File server.js
		-
		  ```javascript
		  const express = require('express');
		  const app = express();
		  const PORT = 3000;
		  const cors = require('cors');
		  const mysql =  require('mysql2/promise');
		  
		  app.use(express.json());
		  app.use(cors());
		  
		  const pool = mysql.createPool({
		      host: 'Localhost',
		      user: 'root',
		      password: 'mật khẩu', //ghi mật khẩu của mysql vào
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
		  ```
