(function() {

  window._render = {
    queue: function() {
      var queueList = __.select('.menu > ul.queue'),
          hasQueue = _data.queue.length && __.isNum(_data.queue[0]);

      // TODO this is just a patch, find out what is causing _data.queue to be [null]
      if( !hasQueue ) {
        _data.queue = [];
      }

      queueList.style.display = hasQueue ? 'block' : 'none';

      document.body.classList[hasQueue ? 'remove' : 'add']('no-queue');

      queueList.innerHTML = 
        _data.queue
        .map(function(chartIndex, i) {
          var chart = _data.charts[chartIndex],
              isSelected = chart.id === (_data.selectedChart || {}).id;

          __.select('.menu ul.list li', true)[chart.index].style.display = 'none';

          if( isSelected ) {
            __.select('.menu ul li', true).forEach(function(li) {
              li.classList.remove('active');
            });
          }

          return '<li onclick="_action.selectChartFromQueue(' + i + ')"' +
            (isSelected ? ' class="active"' : '') +
            ' id="chart-' + chart.id + '">' +
            chart.title +
            '<span onclick="_action.removeFromQueue(' + i + ')">-</span>' +
            '</li>';
        })
        .join('');
    },
    menu: function() {
      __.select('.menu > ul.list').innerHTML =
        _data.charts
        .map(function(chart, i) {
          return '<li onclick="_action.selectChart(' + i + ')" ' +
            'id="chart-' + chart.id + '">' +
            chart.title +
            '<span onclick="_action.addToQueue(' + i + ')">+</span>' +
            '</li>';
        })
        .join('');

      _action.selectChart((_data.selectedChart || {}).index);
    },
    _chords: function(line, hideChords) {
      return (line || '')
        .replace(/ /g, '&nbsp;')
        .replace(/\[(.*?)\]/g, hideChords ? '' : '<div class="chord">$1</div>');
    },
    chart: function(chart, fromHideChords) {
      __.select('.chart').innerHTML =
        !(chart || {}).data ?
        '<div class="empty-chart">select chart from left menu</div>' :
        chart.data.map(function(column) {
          return '<div class="column">' +
            column.map(function(section) {
              return '<ul>' +
                section.map(function(line) {
                  var isEmpty = !line
                    .replace(/\[.*?\]/g, '')
                    .trim();

                  return '<li ' +
                    (isEmpty ? 'class="empty"' : '') + '>' +
                    _render._chords(line, chart.hideChords) +
                    '</li>';
                }).join('') +
                '</ul>';
            }).join('') +
            '</div>';
        }).join('');

      if( chart ) {
        _action.zoom();
        _action.columns(chart.data.length > 1 ? chart.columns : false);
        _action.floatLines(chart.floatLines);

        // super hacky but it gets the job done
        if( !fromHideChords ) {
          _action.hideChords(chart.hideChords);
        }
      }
    }
  };

})();
