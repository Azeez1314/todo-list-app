//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//'start': "nodemon server.js"

//Declare variables
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
require('dotenv').config()
const PORT = 8500;


// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded( {extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to db')}
)

// GET METHOD
app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render("index.ejs", { todoTasks: tasks });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))