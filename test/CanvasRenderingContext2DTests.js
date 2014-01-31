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
