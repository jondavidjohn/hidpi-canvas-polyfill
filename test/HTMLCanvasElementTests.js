module('HTMLCanvasElement Tests', {
	setup: function() {
		window.devicePixelRatio = 2;
	}
});

test('canvas dimensions scale to device pixel ratio', function() {
	var canvas = document.getElementById('test_canvas'),
		context;

	canvas.height = 100;
	canvas.width = 200;

	context = canvas.getContext('2d');

	equal(canvas.height, 200);
	equal(canvas.width, 400);

	equal(canvas.style.height, '100px');
	equal(canvas.style.width, '200px');
});
