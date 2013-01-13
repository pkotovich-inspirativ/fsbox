define(['slide'], function(Slide) {
	
	return function($slide, box) {
		
		jQuery.extend(this, Slide, {
			
			load: function(callback) {

				this.loaded = true
				
				this.center()
				
				if (callback) callback.call($slide.get)
					
			}
		})
		
		this.$slide = $slide
		this.box = box
	}
})