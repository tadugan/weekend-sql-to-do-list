$(document).ready(onReady);

function onReady() {
    console.log('JQ is sourced and working');
    getTasks();
    // listener for submit button
    $('#submitBtn').on('click', postTask);
    // listener for delete buttons
    $('#tasksTableBody').on('click', '.deleteBtn', deleteTaskHandler);
    // listener for done button to mark task as complete
    $('#tasksTableBody').on('click', '.completeTaskBtn', completeTaskHandler);
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
            clearInputs();
        })
        .catch(error => {
            console.log('error in getting tasks. Error:', error);
        });
}


// POST a new task to the database
function postTask() {
    // validate input fields
    if ($('#nameInput').val() === '' || $('#descriptionInput').val() === '') {
        alert('Please fill all input fields.')
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            name: $('#nameInput').val(),
            description: $('#descriptionInput').val()
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
    deleteTask($(this).parent().parent().data('id'));
}


// DELETE a task from DOM and database
function deleteTask(taskId) {
    swal({
        title: "Are you sure you want to delete this task?",
        text: "This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
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
          swal("Task Deleted!", {
            icon: "success",
          });
        }
      });
}


// PUT request handler
function completeTaskHandler() {
    completeTask($(this).parent().parent().data('id'));
}

// PUT request to change state of completed from 'To-Do' (false) to 'Completed' (true)
function completeTask(taskId) {
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`
    })
        .then(response => {
            console.log('task updated successfully');
            getTasks();
        })
        .catch(error => {
            alert('There was an issue updating this task. Please try again.')
        });
}


// updates DOM to display all task in database
function renderTasks(tasksArray) {
    let el = $('#tasksTableBody');
    el.empty();
    // append table headers
    for (i=0; i<tasksArray.length; i++) {
    el.append(`
    <tr data-id="${tasksArray[i].id}" ${addCompleteClass(tasksArray[i].complete)}>
        <td class="taskName">${tasksArray[i].name}</td>
        <td class="taskDescription">${tasksArray[i].description}</td>
        <td>${taskStatus(tasksArray[i].complete)}</td>
        <td>${dateCompleted(tasksArray[i].complete, tasksArray[i].date_completed)}</td>
        <td>${addDoneButton(tasksArray[i].complete)}<button class="deleteBtn btn btn-danger">X</button></td>
    </tr>
    `);
    }
}



// Additonal functions (listed alphabetically)



// adds the 'complete' class to completed tasks
function addCompleteClass(booleanValue) {
    if (booleanValue) {
        return 'class="complete"';
    }
    else {
        return 'class="incomplete"';
    }
}

function addDoneButton(booleanValue) {
    if (!booleanValue) {
        return '<button class="completeTaskBtn btn btn-success">Done</button>';
    }
    else {
        return '';
    }
}

// clear all input fields
function clearInputs() {
    $('#nameInput').val('');
    $('#descriptionInput').val('');
}

// populates date for completed tasks
function dateCompleted(booleanValue, dateOfCompletion) {
    let date = new Date(dateOfCompletion);
    if (booleanValue) {
        return `${moment(date).format("MMM Do YYYY")}`;
    }
    else {
        return '';
    }
}


// function returns 'completed' (if true) or incomplete (if false) 
// depending on database state of 'complete'
function taskStatus(booleanValue) {
    // if task is complete (TRUE)
    if (booleanValue) {
        return 'Completed';
    }
    else {
        return 'To-Do';
    }
}