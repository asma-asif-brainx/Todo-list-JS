document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('submit-task').addEventListener('click', function() {
        const taskInput = document.getElementById('add-task');
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ''; 
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
            const newTaskText = inputField.value.trim();
            if (newTaskText) {
                span.textContent = newTaskText;
                inputField.value = newTaskText;
            }
            span.style.display = 'inline'; 
            inputField.style.display = 'none'; 
            editButton.textContent = 'Edit'; 
        }
    });

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
