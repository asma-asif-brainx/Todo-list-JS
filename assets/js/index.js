document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('add-task');
    const submitButton = document.getElementById('submit-task');
    const todoList = document.getElementById('todo-list');

    if (!taskInput || !submitButton || !todoList) {
        return;
    }

    function createElement(type, className, textContent = '', inputType = 'text') {
        const element = document.createElement(type);
        if (className) element.classList.add(className);
        if (textContent) element.textContent = textContent;
        if (type === 'input') element.type = inputType;
        return element;
    }

    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
            submitButton.disabled = true;
        }
    }

    function toggleInputVisibility(span, inputField, editButton, isEditing) {
        span.style.display = isEditing ? 'none' : 'inline';
        inputField.style.display = isEditing ? 'inline' : 'none';
        editButton.textContent = isEditing ? 'Save' : 'Edit';
        if (isEditing) inputField.focus();
        span.closest('li').dataset.editing = isEditing;
    }

    function saveTaskEdit(span, inputField, editButton) {
        const newTaskText = inputField.value.trim();
        if (newTaskText) {
            span.textContent = newTaskText;
            inputField.value = newTaskText;
        }
        toggleInputVisibility(span, inputField, editButton, false);
    }

    function checkEditInput(inputField) {
        const editButton = inputField.closest('li').querySelector('.edit');
        editButton.disabled = inputField.value.trim() === '';
    }

    taskInput.addEventListener('input', function() {
        submitButton.disabled = taskInput.value.trim() === '';
    });

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTask();
        }
    });

    submitButton.addEventListener('click', handleAddTask);

    todoList.addEventListener('click', function(event) {
        const target = event.target;
        const li = target.closest('li');

        if (target.classList.contains('edit')) {
            const span = li.querySelector('.task-text');
            const inputField = li.querySelector('.task-input');
            const isEditing = inputField.style.display === 'none';
            if (isEditing) {
                toggleInputVisibility(span, inputField, target, true);
                checkEditInput(inputField); 
            } else {
                saveTaskEdit(span, inputField, target);
            }
        }

        if (target.classList.contains('delete')) {
            li.remove();
        }

        if (target.type === 'checkbox') {
            const span = li.querySelector('.task-text');
            if (target.checked) {
                span.classList.add('completed');
            } else {
                span.classList.remove('completed');
            }
        }
    });

    todoList.addEventListener('keydown', function(event) {
        const target = event.target;
        const li = target.closest('li');

        if (target.classList.contains('task-input') && event.key === 'Enter') {
            event.preventDefault();
            const span = li.querySelector('.task-text');
            const editButton = li.querySelector('.edit');
            const newTaskText = target.value.trim();
            if (newTaskText) {
                saveTaskEdit(span, target, editButton);
            } else {
                target.focus(); 
            }
        }
    });

    todoList.addEventListener('input', function(event) {
        if (event.target.classList.contains('task-input')) {
            checkEditInput(event.target);
        }
    });

    function addTask(taskText) {
        const li = createElement('li', 'tasks-list');
        const span = createElement('span', 'task-text', taskText);
        const inputField = createElement('input', 'task-input');
        inputField.value = taskText;
        inputField.style.display = 'none';

        const checkbox = createElement('input', '', '', 'checkbox');
        const editButton = createElement('button', 'edit', 'Edit', 'button');
        const deleteButton = createElement('button', 'delete', 'Delete', 'button');

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(inputField);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }
});
