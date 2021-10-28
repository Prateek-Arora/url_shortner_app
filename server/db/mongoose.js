const mongoose = require('mongoose')
const config = require('../config/keys')


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));