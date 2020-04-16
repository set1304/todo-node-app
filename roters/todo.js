const express = require('express')
const Todo = require('../models/todo')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'My Todo'
    })
})

router.get('/todos', (req, res) => {
    Todo.find({}, function(err, todos) {
        if (err) return console.log(err);
        res.render('todos', {
            title: 'My Todo',
            todos
        })
    });
})

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add Todo'
    })
})

router.get('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, function(err, todo) {
        if (err) return console.log(err);
        console.log("Remove todo ", todo);
        res.redirect('/todos')
    });
})

router.get('/update/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (err) return console.log(err);
        Todo.findByIdAndUpdate(req.params.id, { completed: !todo.completed, title: todo.title }, function(err, doc) {
            if (err) return console.log(err);
            res.redirect('/todos')
        });
    });

})

router.post('/add', (req, res) => {
    const todo = new Todo({ title: req.body.title })
    todo.save(function(err) {
        if (err) return console.error(err);
        console.log('save todo')
    });
    res.redirect('/todos')
})

module.exports = router