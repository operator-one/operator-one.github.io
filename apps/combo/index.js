
(function() {

	window.app = new __.App(
		Object.assign(
			__.uriToJson(),
			{
				title: 'Combination Lock Cracker'
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
		findCombos: function(e) {
			var i, opt1, opt2, tmp,
				secondDigits = [],
				thirdDigits = [],
				firstPos = parseInt(app.$firstPos.val()),
				secondPos = parseInt(app.$secondPos.val()),
				firstDigit = (Math.ceil(app.$resistantLoc.val()) + 5) % 40;
				mod = firstDigit % 4;

			for( i = 0; i < 4; i++ ) {
				opt1 = 10 * i + firstPos;
				opt2 = 10 * i + secondPos;

				if( opt1 % 4 == mod ) {
					thirdDigits.push(opt1);
				}

				if( opt2 % 4 == mod ) {
					thirdDigits.push(opt2);
				}
			}

			for( i = 0; i < 10; i++ ) {
				secondDigits.push(((mod + 2) % 4) + (4 * i));
			}


			console.log('first', firstDigit);
			console.log('second', secondDigits);
			console.log('third', thirdDigits);
		}
	});

})();


$(document).ready(function() {
	app.$body = $(document.body);

	app.$body.append([
		'<h2>Combination Lock Cracker</h2>',
		'<h4>Get your inputs</h4>',
		'<ol>',
		'<li>Set the dial to 0</li>',
		'<li>Apply full pressure upward on the shackle as if trying to open it</li>',
		'<li>Rotate dial to the left (towards 10) hard until the dial gets locked</li>',
		'<li>Notice how the dial is locked into a small groove. If you\'re directly between two digits such as 3 and 4, release the shackle and turn the dial left further until you\'re into the next locked groove. However, if the dial is between two half digits (eg 2.5 and 3.5), then enter the digit in-between into <b>First Locked Position</b> (eg, 3)</li>',
		'<li>Do this again until you find the second digit below 11 that is between two half digits (eg 5.5 and 6.5), and enter the whole number in <b>Second Locked Position</b> (eg, 7)</li>',
		'<li>Apply half as much pressure to the shackle so that you can turn the dial</li>',
		'<li>Rotate dial to the right until you feel resistance. Rotate the dial to the right several more times to ensure you\'re feeling resistance at the same exact location</li>',
		'<li>Enter this number in <b>Resistant Location</b>. If the resistance begins at a half number, such as 14.5, enter 14.5</li>',
		'<ol>',

	].join(''));

	app.$firstPos = $('<input>').val(app.getStorage('firstPos') || '');
	app.$secondPos = $('<input>').val(app.getStorage('secondPos') || '');
	app.$resistantLoc = $('<input>').val(app.getStorage('resistantLoc') || '');
	app.$submit = $('<button id="submit">Find Combos</button>');

	app.$body.append(
		'<label>First Position</label>',
		app.$firstPos,
		'<label>Second Position</label>',
		app.$secondPos,
		'<label>Resistant Location</label>',
		app.$resistantLoc,
		app.$submit
	);

	app.$submit.on('click', app.findCombos);
	app.$firstPos.on('click', app.setStorage.bind(this, 'firstPos', app.$firstPos.val()));
	app.$secondPos.on('click', app.setStorage.bind(this, 'secondPos', app.$secondPos.val()));
	app.$resistantLoc.on('click', app.setStorage.bind(this, 'resistantLoc', app.$resistantLoc.val()));
});
