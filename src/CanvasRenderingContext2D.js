(function(prototype) {

	var pixelRatio = (function() {
			var canvas = document.createElement('canvas'),
					context = canvas.getContext('2d'),
					backingStore = context.backingStorePixelRatio ||
						context.webkitBackingStorePixelRatio ||
						context.mozBackingStorePixelRatio ||
						context.msBackingStorePixelRatio ||
						context.oBackingStorePixelRatio ||
						context.backingStorePixelRatio || 1;

			return (window.devicePixelRatio || 1) / backingStore;
		})(),

		forEach = function(obj, func) {
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					func(obj[p], p);
				}
			}
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
			'translate': 'all',
			'createRadialGradient': 'all',
			'createLinearGradient': 'all'
		};

	if (pixelRatio === 1) return;

	forEach(ratioArgs, function(value, key) {
		prototype[key] = (function(_super) {
			return function() {
				var i, len,
					args = Array.prototype.slice.call(arguments);

				if (value === 'all') {
					args = args.map(function(a) {
						return a * pixelRatio;
					});
				}
				else if (Array.isArray(value)) {
					for (i = 0, len = value.length; i < len; i++) {
						args[value[i]] *= pixelRatio;
					}
				}

				return _super.apply(this, args);
			};
		})(prototype[key]);
	});

	 // Stroke lineWidth adjustment
	prototype.stroke = (function(_super) {
		return function() {
			this.lineWidth *= pixelRatio;
			_super.apply(this, arguments);
			this.lineWidth /= pixelRatio;
		};
	})(prototype.stroke);

	// Text
	//
	prototype.fillText = (function(_super) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.fillText);

	prototype.strokeText = (function(_super) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.strokeText);

	// drawImage
	prototype.drawImage = (function(_super) {
		return function() {
			this.scale(pixelRatio, pixelRatio);
			_super.apply(this, arguments);
			this.scale(1/pixelRatio, 1/pixelRatio);
		};
	})(prototype.drawImage);
})(CanvasRenderingContext2D.prototype);
