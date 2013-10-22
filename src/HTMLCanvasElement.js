(function(prototype) {

	var vendorPrefixes = [
			'webkit',
			'moz',
			'ms',
			'o'
		];

	prototype.getContext = (function(_super) {
		return function(type) {
			context = _super.call(this, type);

			if (type === '2d') {

				var backingStore, ratio, v;

				backingStore = context.backingStorePixelRatio ||
							context.webkitBackingtorePixelRatio ||
							context.mozBackingStorePixelRatio ||
							context.msBackingStorePixelRatio ||
							context.oBackingStorePixelRatio ||
							context.backingStorePixelRatio || 1;

				ratio = (window.devicePixelRatio || 1) / backingStore;

				if (ratio > 1) {
					this.style.height = this.height + 'px';
					this.style.width = this.width + 'px';
					this.width = this.width * ratio;
					this.height = this.height * ratio;
				}
			}

			return context;
		};
	})(prototype.getContext);

})(HTMLCanvasElement.prototype);
