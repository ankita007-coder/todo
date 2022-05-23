const mongoose = require('mongoose');

//creating the schema of the database
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;