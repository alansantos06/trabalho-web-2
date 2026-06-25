require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const path = require('path')

const app = express()

require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/pageRoutes'))

app.listen(3000, () => {
    console.log('Servidor rodando')
})