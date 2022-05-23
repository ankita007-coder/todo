const express = require('express');
const { url } = require('inspector');
const path = require('path');
const app = express();
const port = 8000;
//connection with mongo database
const db = require('./config/mongoose');

const Todo = require('./model/todo');

//for getting the frontend
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.urlencoded());

//for adding task in the database
app.post('/add-todo',function(req,res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    }, function(err, newTodo){
        if(err){console.log('Error in creating task');
    return;}
    console.log('*****',newTodo);
    return res.redirect('back');
    });
});
//to get the values from database
app.get('/',function(req,res){

    Todo.find({},function(err,todos){
        if (err){
            console.log('error in searching tasks from db');
            return;
        }
        return res.render('home', {
            title: "Todo App",
            todo_list: todos
        });
    });
        
});
//for deleting the task 
app.get('/delete-task', function(req,res){
    let id = req.query.id;
    Todo.findByIdAndDelete(id,function(err){
        if (err){
            console.log('Error in deleting');
            return;
        }
        return res.redirect('back');
    });

});

//for checking if the server is working or not
app.listen(port,function(err){
    if (err){
        console.log('error in running on the server',err);
    }
    console.log('express server is running');
});
