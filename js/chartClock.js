const ctx = $("#chartClock")

let data = {
	datasets: [{
		data: [23, 30, 24, 0, 27],
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		],
	}],

	// These labels appear in the legend and in the tooltips when hovering different arcs
	labels: [
		'Red',
		'Yellow',
		'Blue'
	]
};

const chartClock = new Chart(ctx, {
	data: data,
	type: 'polarArea',
	options: {}
});