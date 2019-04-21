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

      if( !id ) {
        return;
      }

      spl = id.split(':');
      id = spl[0];
      trans = Number(spl[1]);

      for( i = 0, len = _data.charts.length; i < len; i++ ) {
        chart = _data.charts[i];

        if( chart.id === id ) {
          if( Number.isInteger(trans) ) {
            chart.transposition = trans;

            if( (_data.selectedChart || {}).id === id ) {
              _data.selectedChart.transposition = trans;
            }
          }

          return chart;
        }
      }
    },
    keydown: function(e) {
      // left, up
      if( !!~[37, 38].indexOf(e.keyCode) ) {
          _action.queueNav(-1);

      // right, down
      } else if( !!~[39, 40].indexOf(e.keyCode) ) {
          _action.queueNav(1);
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
          return (_app.getChartById(id) || {}).index;
        }) || [])
        .filter(function(v) {
          return __.isNum(v);
        });

      if( queue.length && __.isNum(queue[0]) ) {
        _data.queue = queue;
        _app.saveData('queue');
      }

      _render.menu();
      _render.queue();

      document.onkeydown = _app.keydown;
      __.select('.search').onkeyup = _action.filterMenu;
      __.select('.search').onclick = _action.clearFilter;
    }
  };

  _app.init();

})();
