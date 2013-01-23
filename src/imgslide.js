define(['slide'], function(Slide) {
	
	return function($slide, box) {
		
		jQuery.extend(this, Slide, {
			
			load: function(callback) {
				
				var self = this
				
				$slide.load(function() { self.center() })
				
				if (callback) $slide.load(callback)
					
				var srcToLoad = $slide.data('fsboxSrc'), src = $slide.attr('src') 
				
				if (srcToLoad && src != srcToLoad)
					$slide.attr('src', srcToLoad)
				
				this.loaded = true
			}
		})
		
		this.$slide = $slide
		this.box = box
	}
})