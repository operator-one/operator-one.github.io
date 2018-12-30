(function() {

	window._action = {
		share: function() {
			alert([
				'?queue=',
				_data.queue.map(function(chart) { return chart.id; }).join(',')
			].join(''));
		},
		clear: function() {
			_app.clearData('selectedChart');
			_app.clearData('charts');
			_app.clearData('queue');
			_app.clearData('queueIndex');

			location.href = location.origin;
		},
		queueNav: function(direction) {
			_data.queueIndex += direction;
			_app.saveData('queueIndex');

			var index = _data.queueIndex % _data.queue.length;

			if( index < 0 ) {
				index += _data.queue.length;
			}

			_action.selectChartFromQueue(index);
		},
		removeFromQueue: function(index) {
			var chart = _data.queue[index];

			__.select('.menu ul.list > li', true)[chart.index].style.display = 'block';

			if( chart.id === _data.selectedChart.id ) {
				__.select('h2').innerHTML = '';
				_render.chart();
			}

			_data.queue.splice(index, 1);
			_app.saveData('queue');
			_render.queue();
		},
		addToQueue: function(index) {
			var chart = _data.charts[index];

			if( !chart ) {
				return;
			}

			_data.queue.push(chart);
			_app.saveData('queue');
			_render.queue();
		},
		showChart: function(chart) {
			_proc.chart(chart);
			_render.chart(chart);

			var active = __.select('.menu ul li.active');

			if( active ) {
				active.classList.remove('active');
			}

			__.select('#chart-' + chart.id).classList.add('active');
			__.select('h2').innerHTML = chart.title;

			document.body.classList.remove('no-chart');
		},
		selectChartFromQueue: function(index) {
			var chart = _data.queue[index];

			if( !chart ) {
				return;
			}

			_data.queueIndex = index;
			_app.saveData('queueIndex');
			_action.selectChart(_data.queue[index].index);
		},
		selectChart: function(index) {
			var chart = _data.charts[index];

			if( !chart ) {
				console.warn('No chart selected');
				_render.chart();

				return;
			}

			if( (_data.selectedChart || {}).id === chart.id ) {
				_data.charts[chart.index] = _data.selectedChart;
				_app.saveData('charts');
				_action.showChart(_data.selectedChart);

				return;
			}

			_data.selectedChart = chart;
			_app.saveData('selectedChart');

			__.get(
				chart.src,
				function(req) {
					chart.text = req.response;

					_action.showChart(chart);
				},
				function(req) {
					console.error(req.response);
				}
			);
		},
		collapse: function() {
			var isFull = document.body.classList.contains('full');

			document.body.classList[isFull ? 'remove' : 'add']('full');
			__.select('.collapse').innerHTML = isFull ? '&lsaquo;' : '&rsaquo;'
		},
		columns: function(force) {
			var chart = __.select('.chart');
			var noColumns = typeof force !== 'boolean' ?
					chart.classList.contains('no-columns') :
					force;

			_data.selectedChart.columns = noColumns;
			_app.saveData('selectedChart');

			chart.classList[noColumns ? 'remove' : 'add']('no-columns');

			__.select('button.columns').innerHTML = noColumns ? 'ON' : 'OFF';
		},
		floatLines: function(force) {
			var chart = __.select('.chart');
			var floatLines = typeof force !== 'boolean' ?
					!chart.classList.contains('float-lines') :
					force;

			_data.selectedChart.floatLines = floatLines;
			_app.saveData('selectedChart');

			chart.classList[floatLines ? 'add' : 'remove']('float-lines');
			__.select('button.float-lines').innerHTML = floatLines ? 'ON' : 'OFF';
		},
		zoom: function(direction) {
			_data.selectedChart.zoom += direction || 0;
			_app.saveData('selectedChart');

			__.select('.chart > .column', true)
				.forEach(function(column) {
					column.style.zoom = (100 + _data.selectedChart.zoom) + '%';
				});
		},
		transpose: function(direction) {
			_data.selectedChart.transposition += direction;
			_app.saveData('selectedChart');

			_proc.chart(_data.selectedChart);
			_render.chart(_data.selectedChart);
		}
	};

})();
