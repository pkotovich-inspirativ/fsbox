define([], function() {

	return {

		$slide: null,
		box: null,
		nextSlide: null,
		prevSlide: null,
		loaded: false,

		setNextSlide: function(slide) {
			
			var self = this
			
			this.nextSlide = slide

			this.$slide.click(function() { self.box.next() })
		},
		
		setPrevSlide: function(slide) { this.prevSlide = slide },
		
		show: function() {
			
			var self = this
			
			if (this.loaded) this.$slide.fadeIn()
			else this.load(function() { self.$slide.fadeIn() })
			
			if (this.prevSlide) {
				
				this.prevSlide.load()
				this.box.$prevControl.show()
				
			} else this.box.$prevControl.hide()
			
			if (this.nextSlide) {
				
				this.nextSlide.load()
				this.box.$nextControl.show()
				
			} else this.box.$nextControl.hide()
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