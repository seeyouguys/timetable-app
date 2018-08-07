const tasks = getTasks() || getDemoTasks()
renderTasks(tasks)
$('#date').text(moment().format('dddd, D'))

$('.add-task-title').click(function (event) {
	fadeSwitch($('.add-task-title'), $('.add-task-inputs'), 85)
})

// Form and buttons listeners
$('#btn-cancel').click(function (event) {
	event.preventDefault()
	// Clear the inputs
	 $('#add-task-form input').each(function () {
	 	$(this)[0].value = '' // idk why
	})

	fadeSwitch($('.add-task-title'), $('.add-task-inputs'), 85)
})

// recolor btn if all inouts are validated properly
$('#add-task-form').change(function () {
	const form = document.getElementById('add-task-form')
	const text = form['text'].value
	const startTime = form['time-start'].value
	const endTime = form['time-end'].value
	
	if (text && startTime && endTime) {
		$('#btn-add').addClass('btn-primary')
	} else {
		$('#btn-add').removeClass('btn-primary')
	}
})
// add task to the list after form submit
$('#add-task-form').submit(function (event) {
	event.preventDefault()
	const form = event.target
	const task = {
		id: uuidv4(),
		text: form['text'].value,
		startTime: form['time-start'].value,
		endTime: form['time-end'].value,
		priority: getRandomInt(40, 50)
	}
	if (task.text && task.startTime && task.endTime) {
		tasks.push(task)
		saveTasks(tasks)
		renderTasks(tasks)
		fadeSwitch($('.add-task-title'), $('.add-task-inputs'), 85)
		$('#btn-add').removeClass('btn-primary')
	}
	// Clear the inputs
	$('#add-task-form input').each(function () {
		$(this)[0].value = '' // idk why
	})
})
