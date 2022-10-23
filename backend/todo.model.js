// start from here: https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-2/
// create a Todo schema ...

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },

    todo_priority: {
        type: String
    },

    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);