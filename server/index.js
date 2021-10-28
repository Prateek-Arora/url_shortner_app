const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()

const userRoute = require('./routes/api/users')

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require('./db/mongoose')

app.use(passport.initialize());

require('./config/passport')(passport)

app.use('/api/users', userRoute)


app.listen(port, () => console.log(`Server is up and running at port ${port}`))