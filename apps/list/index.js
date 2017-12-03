(function() {

	var app = new __.App(
		Object.assign(
			__.uriToJson(),
			{
				title: 'List'
			}
		)
	);

	console.log(app.options);
	console.log($);

})();
