document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('add-task');
    const submitButton = document.getElementById('submit-task');
    
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    }

    submitButton.addEventListener('click', handleAddTask);

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleAddTask();
        }
    });
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.classList.add('tasks-list');

    const span = document.createElement('span');
    span.textContent = taskText;
    span.classList.add('task-text');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText;
    inputField.classList.add('task-input');
    inputField.style.display = 'none';


    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');

    editButton.addEventListener('click', function() {
        if (inputField.style.display === 'none') {
            span.style.display = 'none'; 
            inputField.style.display = 'inline'; 
            inputField.focus(); 
            editButton.textContent = 'Save'; 
        } else {
            saveEdit();
        }
    });

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            saveEdit();
        }
    });


    function saveEdit() {
    const newTaskText = inputField.value.trim();
    if (newTaskText) {
        span.textContent = newTaskText;
        inputField.value = newTaskText;
    }
    span.style.display = 'inline'; 
    inputField.style.display = 'none'; 
    editButton.textContent = 'Edit'; 
}



    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(inputField);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    document.getElementById('todo-list').appendChild(li);
}