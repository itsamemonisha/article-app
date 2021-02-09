const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;


//monisha 
const MONGODB_URI = 'mongodb+srv://testapp:monisha@cluster0.izdxh.mongodb.net/<dbname>?retryWrites=true&w=majority'


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is on baby!');
});


app.use(morgan('tiny'));

app.get('/api', (req, res) => {
    const data = {
        username: 'monisha',
        age:21
    };
    res.json(data);
});


if (process.env.NODE_ENV == 'production'){
    app.use(express.static('/build'))
}


app.listen(PORT, console.log(`Server is starting!`));


