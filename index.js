const express = require('express')
const hbsexpress = require('express-handlebars')
const path = require('path')
const todoRouter = require('./roters/todo')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const app = express()

const hbs = hbsexpress.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        inputCheckbox: function(completed, id) {
            return new Handlebars.SafeString(
                `<input type="checkbox" class="listmark" data-id="${id}" ${completed ? "checked" : ''}>`
            );
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', todoRouter)


async function start() {
    const url = 'youMongoDbUrl'
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    app.listen('3000', () => {
        console.log('server is running')
    })
}

start()