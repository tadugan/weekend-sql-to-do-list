$(document).ready(onReady);

function onReady() {
    console.log('JQ is sourced and working');
    getTasks();
}

// Primary functions
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

function renderTasks(tasksArray) {
    let el = $('#tasksTable');
    el.empty();
    // append table headers
    el.append(`
    <tr>
        <th>Task</th>
        <th>Description</th>
        <th>Status</th>
        <th>Delete</th>
    </tr>
    `);
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

