(function(prototype) {

	var getPixelRatio = function(context) {
			var backingStore = context.backingStorePixelRatio ||
						context.webkitBackingtorePixelRatio ||
						context.mozBackingStorePixelRatio ||
						context.msBackingStorePixelRatio ||
						context.oBackingStorePixelRatio ||
						context.backingStorePixelRatio || 1;

			return (window.devicePixelRatio || 1) / backingStore;
		},
		ratioArgs = {
			'fillRect': 'all',
			'clearRect': 'all',
			'strokeRect': 'all',
			'moveTo': 'all',
			'lineTo': 'all',
			'arc': [0,1,2],
			'arcTo': 'all',
			'bezierCurveTo': 'all',
			'isPointinPath': 'all',
			'isPointinStroke': 'all',
			'quadraticCurveTo': 'all',
			'rect': 'all',
			'translate': 'all'
		},
		func, value;

		for (func in ratioArgs) {
			if (ratioArgs.hasOwnProperty(func)) {
				(function(value) {
					prototype[func] = (function(_super) {
						return function() {
							var ratio = getPixelRatio(this), i, len,
								args = Array.prototype.slice.call(arguments);

							if (value === 'all') {
								return _super.apply(this, args.map(function(a) { return a * ratio; }));
							}
							else if (Object.prototype.toString.call(value) == '[object Array]') {
								for (i = 0, len = value.length; i < len; i++) {
									args[value[i]] *= ratio;
								}
								return _super.apply(this, args);
							}
						};
					})(prototype[func]);
				})(ratioArgs[func]);
			}
		}


	// Text
	//
	prototype.fillText = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			args[1] *= ratio; // x
			args[2] *= ratio; // y

			this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(w, m, u) {
				return (m * ratio) + u;
			});

			return _super.apply(this, args);
		};
	})(prototype.fillText);

	prototype.strokeText = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);

			args[1] *= ratio; // x
			args[2] *= ratio; // y

			this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(w, m, u) {
				return (m * ratio) + u;
			});

			return _super.apply(this, args);
		};
	})(prototype.strokeText);
})(CanvasRenderingContext2D.prototype);
