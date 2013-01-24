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

			this.$slide.click(function() { self.box.next() })
		},
		
		setPrevSlide: function(slide) { this.prevSlide = slide },
		
		show: function() {
			
			var self = this
			
			var callback = function() {

				if (self.prevSlide) self.prevSlide.load()
				if (self.nextSlide) self.nextSlide.load()
			}
			
			if (this.loaded) this.$slide.fadeIn(callback)
			else if (this.isLoading) this.$slide.load(function() { self.$slide.fadeIn(callback) })
			else this.load(function() { self.$slide.fadeIn(callback) })
			
			if (this.prevSlide) this.box.$prevControl.show()
			else this.box.$prevControl.hide()
			
			if (this.nextSlide) this.box.$nextControl.show()
			else this.box.$nextControl.hide()
		},
		
		hide: function(callback) { this.$slide.fadeOut(400, callback) },
		
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