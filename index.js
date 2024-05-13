document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    
    // Fetch tasks from local storage and render
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
    
    // Add task to local storage and render
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskName = taskInput.value.trim();
            if (taskName !== '') {
                tasks.push({ name: taskName, completed: false });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
                taskInput.value = '';
            }
        }
    });
    
    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.name}</span>
                <button onclick="deleteTask(${index})">❌</button>
                <button onclick="editTask(${index})">✏</button>
            `;
            taskList.appendChild(taskElement);
        });
    }
    
    // Toggle task completion
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
    
    // Delete task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
    
    // Edit task
    window.editTask = function(index) {
        const newTaskName = prompt('Enter new task name:');
        if (newTaskName !== null && newTaskName.trim() !== '') {
            tasks[index].name = newTaskName.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }
});
