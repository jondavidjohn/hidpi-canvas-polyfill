module('CanvasRenderingContext2D Tests', {
	setup: function() {
		window.devicePixelRatio = 2;
	}
});

test('the font size remains unchanged after every text call', function() {
	var font_value = '12px Helvetica',
		canvas = document.getElementById('test_canvas'),
		context = canvas.getContext('2d');

	context.font = font_value;

	context.fillText("Some Text",10,300);
	equal(context.font, font_value);

	context.fillText("Some More Text",10,450);
	equal(context.font, font_value);
});

test('the lineWidth property remains unchanged after every stroke call', function() {
	var line_width_value = 12,
		canvas = document.getElementById('test_canvas'),
		context = canvas.getContext('2d');

	context.lineWidth = line_width_value;

	context.moveTo(250,150);
	context.arcTo(350,50,350,100,50);
	context.stroke();
	equal(context.lineWidth, line_width_value);

	context.moveTo(10,15);
	context.arcTo(30,50,30,10,50);
	context.stroke();
	equal(context.lineWidth, line_width_value);
});
