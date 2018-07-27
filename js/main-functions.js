// Get the tasks from localStorage
const getTasks = () => JSON.parse(localStorage.getItem('tasksJSON'))

// Get dummy data for the demonstration
const getDemoTasks = () => [{
	id: uuidv4(),
	text: 'Спорт',
}, {
	id: uuidv4(),
	text: 'Сон'
}, {
	id: uuidv4(),
	text: 'Прогулка'
}]

// Save tasks to localStorage
const saveTasks = (tasks) => localStorage.setItem('tasksJSON', JSON.stringify(tasks))

// Generate Task DOM element
const generateTaskEl = function (task) {
	const taskRoot = $('<li class="list-group-item">')
	const row = $('<div class="row">')
	
	taskRoot.append(row)
	
	const controlsContainer = $('<div class="task-controls col-sm-6 hidden" style="padding: 0;">')
	const timeContainer = $('<div class="task-time col-sm-6 text-center text-muted">')
	
	const col1 = $('<div class="col-sm-7">')
	const col2 = $('<div class="col-sm-5 row" style="padding: 0;">')
	
	col2.append(timeContainer, controlsContainer)
	row.append(col1, col2)
	
	// text
	col1.append(task.text)
	
	// controls
	const btnEdit = $('<button class="btn btn-md btn-warning">E</button>')
	const btnRemove = $('<button class="btn btn-md btn-danger">X</button>')
	controlsContainer.append(btnRemove, btnEdit)
	
	btnEdit.click((e) => console.log(e.target, 'edit'))

	btnRemove.click(function (e) {
		tasks.splice(tasks.indexOf(task), 1)
		saveTasks(tasks)
		renderTasks(tasks)
	})
	
	// time
	const timeEl = $(`<div class='time'>${task.startTime} - ${task.endTime}</div>`)
	timeContainer.append(timeEl) 
	
	taskRoot.mouseenter((e) => timeEl.animate({ "right": "+=50px" }, 70, (e) => controlsContainer.fadeToggle(80)))
	taskRoot.mouseleave((e) => controlsContainer.fadeToggle(30, (e) => timeEl.animate({ "right": "-=50px" }, 80)))

	
	return taskRoot
}

// Render the tasks
const renderTasks = function (tasks) {
	// Clean the existing tasks
	const taskContainer = $('#task-container')
	taskContainer.empty()
	
	// Sort them by timeStart
	tasks.sort(function (a, b) {
		if (a.startTime > b.startTime) {
			return 1
		} else if (a.startTime < b.startTime) {
			return -1
		} else {
			return 0
		}
	})

	// Render them
	tasks.forEach(task => taskContainer.append(generateTaskEl(task)))
}

// Hide one item to show another and vice versa
const fadeSwitch = function (firstItem, secondItem, fadetime) {
	if (firstItem.is(':visible')) {
		firstItem.fadeToggle(fadetime, () => secondItem.fadeToggle(fadetime))
	} else {
		secondItem.fadeToggle(fadetime, () => firstItem.fadeToggle(fadetime))
	}
}