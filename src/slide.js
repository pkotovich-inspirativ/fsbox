define([], function() {

	return {

		$slide: null,
		box: null,
		nextSlide: null,
		prevSlide: null,
		loaded: false,
		isLoading: false,

		setNextSlide: function(slide) {
			
			var self = this
			
			this.nextSlide = slide

			this.$slide.click(function(event) { self.box.next() })
		},
		
		setPrevSlide: function(slide) { this.prevSlide = slide },
		
		showExecutor: function($slide, callback) {
			
			$slide.css('opacity', 0)
			$slide.show()
			$slide.animate({opacity: 1}, callback)
		},
		
		show: function() {
			
			var self = this
			
			var callback = function() {

				if (self.prevSlide) self.prevSlide.load()
				if (self.nextSlide) self.nextSlide.load()
				
				self.box.isSwitching = false
			}
			
			if (this.loaded) this.showExecutor(this.$slide, callback)
			else if (this.isLoading)
				this.$slide.load(function() { self.showExecutor(self.$slide, callback) })
			else this.load(function() { self.showExecutor(self.$slide, callback) })
			
			if (this.prevSlide) this.box.$prevControl.show()
			else this.box.$prevControl.hide()
			
			if (this.nextSlide) this.box.$nextControl.show()
			else this.box.$nextControl.hide()
		},
		
		hideExecutor: function($slide, callback) {

			$slide.animate({opacity: 0}, function() {
				
				$(this).hide()
				
				if (callback) callback.apply(this)
			})
		},
		
		hide: function(callback) { this.hideExecutor(this.$slide, callback) },
		
		center: function() {
			
			if (!this.loaded) return
			
			this.$slide.css({
				position: 'absolute',
				top: (this.$slide.parent().height() - this.$slide.height())/2,
				left: (this.$slide.parent().width() - this.$slide.width())/2
			})
		}
	}	
})