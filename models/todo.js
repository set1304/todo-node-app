const { Schema, model } = require('mongoose')

const todoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', todoSchema)