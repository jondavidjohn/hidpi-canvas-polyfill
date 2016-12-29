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

	// Image
	//
	prototype.drawImage2x = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);
			
			var sizeRatio = ratio / 2;
			
			var newArgs = args;
			if (args.length == 3) {
				// img, x, y
				newArgs = [args[0], args[1]*ratio, args[2]*ratio,
					args[0].width*sizeRatio, args[0].height*sizeRatio];
			} else if (args.length == 5) {
				// img, x, y, w, h
				newArgs = [args[0], args[1]*ratio, args[2]*ratio,
					args[3]*sizeRatio, args[4]*sizeRatio];
			} else if (args.length == 9) {
				// img, sx, sy, sw, sh, x, y, w, h
				newArgs = [args[0], args[1], args[2], args[3], args[4],
					args[5]*ratio, args[6]*ratio, args[7]*sizeRatio, args[8]*sizeRatio];
			}
			
			_super.apply(this, newArgs);
		};
	})(prototype.drawImage);
	prototype.drawImage = (function(_super) {
		return function() {
			var ratio = getPixelRatio(this),
				args = Array.prototype.slice.call(arguments);
			
			var newArgs = args;
			if (args.length == 3) {
				// img, x, y
				newArgs = [args[0], args[1]*ratio, args[2]*ratio,
					args[0].width*ratio, args[0].height*ratio];
			} else if (args.length == 5) {
				// img, x, y, w, h
				newArgs = [args[0], args[1]*ratio, args[2]*ratio,
					args[3]*ratio, args[4]*ratio];
			} else if (args.length == 9) {
				// img, sx, sy, sw, sh, x, y, w, h
				newArgs = [args[0], args[1], args[2], args[3], args[4],
					args[5]*ratio, args[6]*ratio, args[7]*ratio, args[8]*ratio];
			}
			
			_super.apply(this, newArgs);
		};
	})(prototype.drawImage);
})(CanvasRenderingContext2D.prototype);
