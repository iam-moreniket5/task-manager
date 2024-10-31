const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.querySelector('.task-list');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let tasks = [];

function loadTasks() {
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
tasks = JSON.parse(storedTasks);
renderTasks();
}
}

function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
taskList.innerHTML = '';
tasks.forEach((task, index) => {
const taskElement = document.createElement('div');
taskElement.classList.add('task');
if (task.completed) {
taskElement.classList.add('completed');
}
taskElement.innerHTML = `
<span>${task.text}</span>
<button class="complete-task">Complete</button>
<button class="delete-task">Delete</button>
`;
taskList.appendChild(taskElement);

const completeButton = taskElement.querySelector('.complete-task');
completeButton.addEventListener('click', () => {
task.completed = !task.completed;
saveTasks();
renderTasks();
});

const deleteButton = taskElement.querySelector('.delete-task');
deleteButton.addEventListener('click', () => {
tasks.splice(index, 1);
saveTasks();
renderTasks();
});
});
}

addTaskButton.addEventListener('click', () => {
const taskText = taskInput.value;
if (taskText !== '') {
tasks.push({ text: taskText, completed: false });
saveTasks();
renderTasks();
taskInput.value = '';
}
});

filterButtons.forEach(button => {
button.addEventListener('click', () => {
const filter = button.id.replace('filter-', '');
if (filter === 'all') {
renderTasks();
} else {
renderTasks(tasks.filter(task => task.completed === (filter === 'completed')));
}
button.classList.toggle('active', true);
filterButtons.forEach(otherButton => {
if (otherButton !== button) {
otherButton.classList.remove('active');
}
});
});
});

const clearCompletedButton = document.getElementById('clear-completed');
clearCompletedButton.addEventListener('click', () => {
tasks = tasks.filter(task => !task.completed);
saveTasks();
renderTasks();
});

loadTasks();