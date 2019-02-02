(function() {

	window._app = {
		saveData: function(key) {
			localStorage[key] = JSON.stringify(_data[key]);
		},
		clearData: function(key) {
			delete localStorage[key];
			delete _data[key];
		},
		fetchData: function(key) {
			var data = localStorage[key];

			return data ? JSON.parse(data) : void 0;
		},
		getChartById: function(id) {
			var i, len, chart;

			for( i = 0, len = _data.charts.length; i < len; i++ ) {
				chart = _data.charts[i];

				if( chart.id === id ) {
					return chart;
				}
			}
		},
		init: function() {
			_data.selectedChart = _app.fetchData('selectedChart');
			_data.charts = _app.fetchData('charts') || _proc.charts(_data.charts);
			_data.queue = _app.fetchData('queue') || [];
			_data.queueIndex = _app.fetchData('queueIndex') || -1;
			_app.saveData('charts');

			var queue = ((__.getQueryParams()['queue'] || '')
					.split(',')
					.map(function(id) {
						return _app.getChartById(id);
					}) || [])
					.filter(function(v) {
						return !!v;
					});

			if( queue.length && queue[0] ) {
				_data.queue = queue;
				_app.saveData('queue');
			}

			_render.menu();
			_render.queue();
		}
	};

	_app.init();

})();