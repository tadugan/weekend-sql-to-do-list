$(document).ready(onReady);

function onReady() {
    console.log('JQ is sourced and working');
    getTasks();
    // listener for submit button
    $('#submitBtn').on('click', postTask);
    // listener for delete buttons
    $('#tasksTableBody').on('click', '#deleteBtn', deleteTaskHandler);
}


// Primary functions
// GET all tasks from the database
function getTasks() {
    console.log('in getTasks');

    $.ajax({
        type: 'GET',
        url: '/tasks'
    })
        .then(response => {
            renderTasks(response);
        })
        .catch(error => {
            console.log('error in getting tasks. Error:', error);
        });
}


// POST a new task to the database
function postTask() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            name: $('#nameInput').val(),
            description: $('descriptionInput').val()
        }
    })
        .then(response => {
            console.log('New task added to database');
            getTasks();
        })
        .catch(error => {
            console.log('Could not add task to database. Error:', error);
        });
}

// DELETE task handler
function deleteTaskHandler() {
    deleteTask($(this).data('id'));
}

// DELETE a task from DOM and database
function deleteTask(taskId) {
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    })
        .then(response => {
            console.log('task deleted successfully');
            getTasks();
        })
        .catch(error => {
            alert('There was an issue deleting this task. Please try again.')
        });
}


// updates DOM to display all task in database
function renderTasks(tasksArray) {
    let el = $('#tasksTableBody');
    el.empty();
    // append table headers
    for (i=0; i<tasksArray.length; i++) {
    el.append(`
    <tr>
        <td>${tasksArray[i].name}</td>
        <td>${tasksArray[i].description}</td>
        <td>${tasksArray[i].complete}</td>
        <td><button id="deleteBtn" data-id="${tasksArray[i].id}">Delete</button></td>
    </tr>
    `);
    }
}



// Additonal functions (listed alphabetically)

