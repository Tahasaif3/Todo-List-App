document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const modal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveEditBtn = document.getElementById('save-edit');
    const cancelEditBtn = document.getElementById('cancel-edit');
    let currentEditTodo = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        if (input.value.trim() === '') return;

        const todoItem = createTodoItem(input.value);
        todoList.appendChild(todoItem);
        input.value = '';
    }

    function createTodoItem(text) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const todoText = document.createElement('span');
        todoText.textContent = text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            openEditModal(todoItem, todoText);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
        });

        todoItem.appendChild(todoText);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);

        todoItem.addEventListener('click', (e) => {
            if (e.target === todoItem || e.target === todoText) {
                todoItem.classList.toggle('completed');
            }
        });

        return todoItem;
    }

    function openEditModal(todoItem, todoText) {
        currentEditTodo = todoItem;
        editInput.value = todoText.textContent;
        modal.style.display = 'block';
    }

    saveEditBtn.addEventListener('click', () => {
        if (currentEditTodo && editInput.value.trim() !== '') {
            currentEditTodo.querySelector('span').textContent = editInput.value;
            closeEditModal();
        }
    });

    cancelEditBtn.addEventListener('click', closeEditModal);

    function closeEditModal() {
        modal.style.display = 'none';
        currentEditTodo = null;
        editInput.value = '';
    }

    // Close the modal if clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditModal();
        }
    });
});