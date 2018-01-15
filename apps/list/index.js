(function() {

	window.app = new __.App(
		Object.assign(
			__.uriToJson(),
			{
				title: 'List'
			}
		)
	);

	Object.assign(app, {
		getStorage: function(key) {
			return JSON.parse(localStorage.getItem(key));
		},
		setStorage: function(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		clearStorage: function(key) {
			localStorage.removeItem(key);
		},
		save: function() {
			app.list = [];

			$('li', app.$list).each(function(i, el) {
				var $el = $(el),
				val = $('input', $el).val();

				if( !val ) {
					return;
				}

				app.list.push({
					value: val,
					checked: $el.is('.checked')
				});
			});

			app.setStorage('list', app.list);
		},
		renderList: function() {
			var list = [];

			if( !__.isArr(app.list) ) {
				return;
			}

			app.$list.empty();

			app.list.forEach(function(val) {
				value = val.value.trim();

				if( !value ) {
					return;
				}

				list.push([
						'<li ' + (val.checked ? 'class="checked"' : '') + '>',
						'<input type="text" value="', value, '"/>',
						'<button class="remove">remove</button>',
						'</li>'
				].join(''))
			});

			app.$list.append(list.join(''));

			$('li', app.$list).on('click', app._onCheck);
			$('li .remove', app.$list).on('click', app._onRemove);
		},
		_onRemove: function(e) {
			var $li;

			$li = $(e.currentTarget).parents('li');

			$li.remove();
			app.save();

			e.stopPropagation();
		},
		_onSubmit: function(e) {
			var newItems = [],
			split = app.$textArea.val().split(/,|\n/g);

			split.forEach(function(val) {
				if( !val ) {
					return;
				}

				newItems.push({
					value: val,
					checked: false
				});
			});

			app.list = (app.getStorage('list') || []).concat(newItems);

			app.setStorage('list', app.list);
			app.renderList();
			app.$textArea.val('');
		},
		_onClear: function() {
			app.$list.empty();
			app.$textArea.val('');
			app.setStorage('backup', app.list);
			app.clearStorage('list');

			app.list = null;
		},
		_onCheck: function(e) {
			if( $(e.target).is('input') ) {
				return;
			}

			$(e.currentTarget).toggleClass('checked');
			app.save();
		},
		_onOrder: function(e) {
			$('li.checked', app.$list).detach().appendTo(app.$list);

			app.save();
		},
		_onCopy: function() {
			var copied, list,
			$input = $('<input>'),
			list = (app.list || []).map(function(v) {
				return v.value;
			}).join(', ');

			$(document.body).append($input);
			$input.val(list).select();
			document.execCommand('copy');
			alert('You list was copied: ' + list);
			$input.remove();
		}
	});

})();


$(document).ready(function() {
	app.$body = $(document.body);
	app.$input = $('<input>');
	app.$clear = $('<button id="clear">Clear</button>');
	app.$submit = $('<button id="submit">Submit</button>');
	app.$order = $('<button id="order">Order</button>');
	app.$copy = $('<button id="copy">Copy List</button>');
	app.$textArea = $('<textarea placeholder="item 1, item 2, item 3, etc."></textarea>');
	app.$list = $('<ul>');
	app.list = app.getStorage('list');

	app.$body.append(
		app.$textArea,
		app.$submit,
		app.$clear,
		app.$order,
		app.$copy,
		app.$list
	);

	app.renderList();
	app.$clear.on('click', app._onClear);
	app.$submit.on('click', app._onSubmit);
	app.$order.on('click', app._onOrder);
	app.$copy.on('click', app._onCopy);
});
