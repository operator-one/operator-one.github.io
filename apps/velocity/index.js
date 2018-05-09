(function() {

	var app = new __.App(
		Object.assign(
			__.uriToJson(),
			{
				title: 'velocity'
			}
		)
	);

})();

$(document).ready(function() {
	var $body = $(document.body),
		$totalDevs = $('<input>'),
		$daysInSprint = $('<input>'),
		$addTime = $('<input>'),
		$removeTime = $('<input>'),
		$potentialTime = $('<input disabled>'),
		$actualTime = $('<input disabled>'),
		$velocity = $('<input>'),
		$bugWeight = $('<input>'),
		$pulledIn = $('<input>'),
		$pulledInTotal = $('<span>'),
		$pointsLeft = $('<span class="points-left">'),
		$target = $('<input disabled>'),
		data = JSON.parse(localStorage.getItem('data')),
		getValue = function(val) {
			return Number((val || '').replace(/[^0-9\.]/g, ''));
		},
		onKeyUp = function() {
			var targetValue, pulledInTotal,
				totalDevs = getValue($totalDevs.val()),
				daysInSprint = getValue($daysInSprint.val()),
				addTime = getValue($addTime.val()),
				removeTime = getValue($removeTime.val()),
				potentialTime = totalDevs * daysInSprint * 6,
				actualTime = potentialTime + addTime - removeTime,
				velocity = getValue($velocity.val()),
				bugWeight = getValue($bugWeight.val()),
				pulledIn = $pulledIn.val();

			$potentialTime.val(potentialTime);
			$actualTime.val(actualTime);

			pulledInTotal = $pulledIn.val().split(',').reduce(function(total, val) {
				return Number(total) + Number(val);
			});

			$pulledInTotal.html(pulledInTotal);

			targetValue = Math.ceil((( actualTime / potentialTime ) * velocity ) - bugWeight);

			$target.val(targetValue);
			$pointsLeft.html($target.val() - pulledInTotal);

			localStorage.setItem('data', JSON.stringify({
				totalDevs: totalDevs,
				daysInSprint: daysInSprint,
				addTime: addTime,
				removeTime: removeTime,
				potentialTime: potentialTime,
				actualTime: actualTime,
				velocity: velocity,
				bugWeight: bugWeight,
				pulledIn: pulledIn
			}));

			return false;
		},
		makeLabel = function(str) {
			return '<label>' + str + '</label>';
		};

	$body.append(
		makeLabel('Available Devs'),
		$totalDevs,
		'<br>',
		makeLabel('Days in Sprint'),
		$daysInSprint,
		'<br>',
		makeLabel('Remove Hours'),
		$removeTime,
		'<br>',
		makeLabel('Add Hours'),
		$addTime,
		'<br>',
		makeLabel('Max Potential Dev Time'),
		$potentialTime,
		'<br>',
		makeLabel('Allocated Dev Time'),
		$actualTime,
		'<br>',
		makeLabel('Average Team Velocity (over last x number of sprints)'),
		$velocity,
		'<br>',
		makeLabel('Added point weight for bugs and/or carry over stories'),
		$bugWeight,
		'<br><hr>You should pull in roughly ',
		$target,
		' story points.<br>',
		'Points pulled in, i.e. 2, 5, 3, 8, 8 ',
		$pulledIn,
		$pulledInTotal,
		$pointsLeft ?
			'<br>You should pull in ' + $pointsLeft + ' more points. <i>as if it mattered</i>' :
			''
	).css({
		'font-family': 'monospace'
	});

	if( $.isPlainObject(data) ) {
		$totalDevs.val(data.totalDevs);
		$daysInSprint.val(data.daysInSprint);
		$addTime.val(data.addTime);
		$removeTime.val(data.removeTime);
		$potentialTime.val(data.potentialTime);
		$actualTime.val(data.actualTime);
		$velocity.val(data.velocity);
		$bugWeight.val(data.bugWeight);
		$pulledIn.val(data.pulledIn);
	}

	$('input')
		.on('keyup', onKeyUp)
		.css({
			padding: '10px 5px',
			margin: '10px 5px'
		});

	onKeyUp();

	$body.on('keyup', function(e) {
		if( e.which = 100 ) {
			$body.toggleClass('dark');
		}
	});
});
