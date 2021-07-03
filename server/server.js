const express = require('express');
// const tasksRouter = require('./routes/tasks.router.js');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// setup static file server
app.use(express.static('server/public'));

// Routes go here
// app.use('/tasks', tasksRouter);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('express server listening on PORT:', PORT);
});