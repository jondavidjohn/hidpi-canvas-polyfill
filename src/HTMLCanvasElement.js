(function(prototype) {
	prototype.getContext = (function(_super) {
		return function(type) {
			var backingStore, ratio, style, _width, _height,
				context = _super.call(this, type);

			if (type === '2d') {

				backingStore = context.backingStorePixelRatio ||
							context.webkitBackingStorePixelRatio ||
							context.mozBackingStorePixelRatio ||
							context.msBackingStorePixelRatio ||
							context.oBackingStorePixelRatio ||
							context.backingStorePixelRatio || 1;

				ratio = (window.devicePixelRatio || 1) / backingStore;

				if (ratio > 1) {
    					style = this.parentNode.currentStyle || getComputedStyle(this.parentNode);
					_width = this.parentNode.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
					_height = this.parentNode.clientHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);
					
					this.style.width = _width + 'px';
					this.style.height = _height + 'px';					
					this.width = _width * ratio;
					this.height = _height * ratio;
				}
			}

			return context;
		};
	})(prototype.getContext);
})(HTMLCanvasElement.prototype);
