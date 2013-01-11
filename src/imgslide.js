define(['slide'], function(Slide) {
	
	return function($slide, box) {
		
		jQuery.extend(this, Slide, {
			
			load: function(callback) {
				
				var self = this
				
				$slide.load(function() { self.center() })
				
				if (callback) $slide.load(callback)
					
				$slide.attr('src', $slide.data('fsboxSrc'))
				this.loaded = true
			}
		})
		
		this.$slide = $slide
		this.box = box
	}
})