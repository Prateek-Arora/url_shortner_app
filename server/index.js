const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()

const userRoute = require('./routes/api/users')
const urlRoute = require('./routes/api/url');
const redirectUrl = require('./routes/api/redirectUrl')

const port = process.env.PORT || 5000;
const app = express();
// const corsOptions ={
//     origin:'http://localhost:5000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require('./db/mongoose')

app.use(passport.initialize());

require('./config/passport')(passport)

app.use('/', redirectUrl)
app.use('/api/users', userRoute)
app.use('/api/urls', urlRoute)


app.listen(port, () => console.log(`Server is up and running at port ${port}`))