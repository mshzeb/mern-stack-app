/*
Create an Express Server, attach CORS and body parser middleware
 and listen the server at port 4000.
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB Database connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Retrieve todo item by providing an ID
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// Route to add new todo items by calling a HTTP POST request (/add)
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => { // The callback to execute when the Promise is resolved.
            res.status(200).json({'todo': 'todo added successfully.'});
        })
        .catch(err => { //The callback to execute when the Promise is rejected.
            res.status(400).send('Adding New Todo Failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo Updated!');
            })
            .catch(err => {
                res.status(400).send("Update Not Possible");
            });
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});