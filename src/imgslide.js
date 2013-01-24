define(['slide'], function(Slide) {
	
	return function($slide, box) {
		
		jQuery.extend(this, Slide, {
			
			load: function(callback) {
				
				var self = this
				
				var srcToLoad = $slide.data('fsboxSrc'), src = $slide.attr('src') 
				
				if (srcToLoad && src != srcToLoad) {
					
					box.spinner.show($slide.get()[0])
					
					$slide.load(function() {
						
						self.loaded = true
						self.center()
						box.spinner.hide(this)
					})

					if (callback) $slide.load(callback)

					this.isLoading = true
					
					$slide.attr('src', srcToLoad)
				}
			}
		})
		
		this.$slide = $slide
		this.box = box
	}
})