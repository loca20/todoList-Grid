let tasks = [
	{ content: "zjeść obiad", done: true },
	{ content: "zjeść kolację", done: false },
];

let hideDoneTasks = false;

const addNewTask = (newTaskContent) => {
	tasks = [...tasks, { content: newTaskContent }];
	render();
};

const removeTask = (taskIndex) => {
	tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

	render();
};

const toggleTaskDone = (taskIndex) => {
	tasks = [
		...tasks.slice(0, taskIndex),
		{
			...tasks[taskIndex],
			done: !tasks[taskIndex].done,
		}.content.charAt.tasks.slice(taskIndex + 1),
	];
	render();
};

const bindEvents = () => {
	const removeButtons = document.querySelectorAll(".js-remove");

	removeButtons.forEach((removeButton, index) => {
		removeButton.addEventListener("click", () => {
			removeTask(index);
		});
	});

	const toggleDoneButtons = document.querySelectorAll(".js-done");

	toggleDoneButtons.forEach((toggleDoneButton, index) => {
		toggleDoneButton.addEventListener("click", () => {
			toggleTaskDone(index);
		});
	});
};

const renderTasks = () => {
	let taskHtmlString = "";

	for (const task of tasks) {
		taskHtmlString += `
<li class="task${task.done ? " taskDone" : ""}">
<button class="task__button js-done">
<i class="fa-solid fa-check${
			task.done ? "" : " task__buttonIcon"
		}"></i></button>
<span class="task__content">${task.content}</span>
<button class="task__button task__button--remove js-remove">
<i class="fa-regular fa-trash-can"></i></button>
</li>
`;
	}

	document.querySelector(".js-tasks").innerHTML = taskHtmlString;
};

const renderButtons = () => {
	let buttonHtmlString = "";

	if (tasks.length > 0) {
		buttonHtmlString += `
			<button class="section__button js-HideDoneTasksButton">
			${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
			</button>
			<button 
			class="section__button js-completeAllTasksButton"
			${tasks.every(({ done }) => done) ? "disabled" : ""}
		>
			Ukończ wszystkie
		</button>`;
	}
	document.querySelector(".js-buttons").innerHTML = buttonHtmlString;
};

const bindButtonsEvents = () => {};

const render = () => {
	renderTasks();
	renderButtons();
	bindEvents();
	bindButtonsEvents();
};

const onFormSubmit = (event) => {
	event.preventDefault();

	const input = document.querySelector(".js-newTask");
	const newTaskContent = input.value.trim();

	if (newTaskContent === "") {
		return;
	}
	addNewTask(newTaskContent);
	input.value = "";
	input.focus();
};

const init = () => {
	render();

	const form = document.querySelector(".js-form");

	form.addEventListener("submit", onFormSubmit);
};

init();
