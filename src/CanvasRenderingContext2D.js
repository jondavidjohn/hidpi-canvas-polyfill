(function(prototype) {

	var getPixelRatio = function(context) {
		var backingStore = context.backingStorePixelRatio ||
					context.webkitBackingtorePixelRatio ||
					context.mozBackingStorePixelRatio ||
					context.msBackingStorePixelRatio ||
					context.oBackingStorePixelRatio ||
					context.backingStorePixelRatio || 1;

		return (window.devicePixelRatio || 1) / backingStore;
	};

	// Rect
	//

	prototype.fillRect = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.fillRect);

	prototype.clearRect = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.clearRect);

	prototype.strokeRect = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.strokeRect);

	// Lines
	//

	prototype.moveTo = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.moveTo);

	prototype.lineTo = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.lineTo);

	// Arcs
	//

	prototype.arc = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			args[0] *= ratio; // x
			args[1] *= ratio; // y
			args[2] *= ratio; // radius

			return _super.apply(this, args);
		};
	})(prototype.arc);

	// Bezier Curves
	//

	prototype.bezierCurveTo = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			return _super.apply(this, args.map(function(a) { return a * ratio; }));
		};
	})(prototype.bezierCurveTo);

	// Text
	//

	prototype.fillText = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			args[1] *= ratio; // x
			args[2] *= ratio; // y

			this.font = this.font.replace(/(\d+)(px)/g, function(w, m, u) {
				return (m * 2) + u;
			});

			return _super.apply(this, args);
		};
	})(prototype.fillText);
})(CanvasRenderingContext2D.prototype);
