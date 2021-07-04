const pool = require('../modules/pool');
const express = require('express');

const tasksRouter = express.Router();

// GET 
// Query to get contents of entire to_do_list table
tasksRouter.get('/', (req, res) => {
    // variable to hold query text
    const queryText = 'SELECT * FROM to_do_list;';
    // SQL query to DB
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error trying to get contents from database', error);
            res.sendStatus(500);
        });
});

// POST
// Query to add a new task
tasksRouter.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO to_do_list ("name", "description")
    VALUES ($1, $2);
    `;
    pool.query(queryText, [newTask.name, newTask.description])
        .then(result => {
            console.log(`${newTask.name} and ${newTask.description}`)
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new task ${queryText}. Error: ${error}`);
            res.sendStatus(500);
        });
});

// PUT
// PUT request to switch 'completed' value to true
tasksRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = `
    UPDATE to_do_list 
    SET "complete"='TRUE' 
    WHERE id=$1;
    `;

    pool.query(queryText, [taskId])
        .then(response => {
            console.log('updated this many rows:', response.rowCount); // should be 1
            res.sendStatus(202);
        })
        .catch(error => {
            console.log('Error in updating status of task. Error:', error);
            res.sendStatus(500);
        });
});

// DELETE
// DELETE request to remove a task from database
tasksRouter.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = `
    DELETE FROM to_do_list
    WHERE id = $1;
    `;

    pool.query(queryText, [taskId])
        .then(response => {
            console.log('deleted this many rows:', response.rowCount); // should be 1
            res.sendStatus(204);
        })
        .catch(error => {
            console.log('Error in deleting task. Error:', error);
            res.sendStatus(500);
        });
})

// Export router
module.exports = tasksRouter;