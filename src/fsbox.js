(function($) {
	
	var ImgSlide = function($slide, $box) {
		
		$.extend(this, {
			
			nextSlide: null,
			prevSlide: null,
			$slide: $slide,
			$box: $box,
			loaded: false,
			
			setNextSlide: function(slide) {
				
				this.nextSlide = slide

				$slide.click(function() { $box.fsbox('next') })
			},
			
			setPrevSlide: function(slide) { this.prevSlide = slide },
			
			show: function() {
				
				var $slide = this.$slide, self = this
				
				if (this.loaded) $slide.fadeIn()
				else this.load(function() { self.center(); $slide.fadeIn() })
				
				if (this.prevSlide) {
					
					this.prevSlide.load()
					this.$box.data('fsbox').$prevControl.show()
					
				} else this.$box.data('fsbox').$prevControl.hide()
				
				if (this.nextSlide) {
					
					this.nextSlide.load()
					this.$box.data('fsbox').$nextControl.show()
					
				} else this.$box.data('fsbox').$nextControl.hide()
			},
			
			hide: function(callback) { this.$slide.fadeOut(400, callback) },
			
			load: function(callback) {
				
				this.$slide.load(callback)
				
				this.$slide.attr('src', this.$slide.data('fsboxSrc'))
				this.loaded = true
			},
			
			center: function() {
				
				$slide.css({
					position: 'absolute',
					top: ($slide.parent().height() - $slide.height())/2,
					left: ($slide.parent().width() - $slide.width())/2
				})
			}
		})
	}
	
	var methods = {
			
		init: function(data) {
			
			if (data) return
				
			var data = {}
			
			this.detach()
				.css({position: 'absolute'})
				.appendTo($('body'))
				
			var $box = this
			
			data.$prevControl = this.find('.prev')
			data.$nextControl = this.find('.next')
			
			this.find('.close a').click(function() { $box.fsbox('close'); return false })
			this.find('.prev a').click(function() { $box.fsbox('prev'); return false })
			this.find('.next a').click(function() { $box.fsbox('next'); return false })

			var prevSlide = null;
			
			data.slides = this.find('.slides > *').map(function() {

				var $this = $(this), slide = new ImgSlide($this, $box)
				
				$this.hide()

				if (prevSlide) {
					
					prevSlide.setNextSlide(slide)
					
					slide.setPrevSlide(prevSlide)
					
				} else data.currentSlide = slide
				
				prevSlide = slide
				
				return slide
				
			}).get()
			
			this.data('fsbox', data)
		},
		
		open: function() {
			
			var data = this.data('fsbox')
			
			data.bodyOverflow = $('body').css('overflow')
			$('body').css('overflow', 'hidden')
			
			this.fadeIn()
			
			data.currentSlide.show()
		},
		
		close: function() {
			
			this.fadeOut()
			
			$('body').css('overflow', this.data('fsbox').bodyOverflow)
		},
		
		prev: function() {
			
			var currentSlide = this.data('fsbox').currentSlide
			
			if (currentSlide.prevSlide) {
				
				currentSlide.hide(function() { currentSlide.prevSlide.show() })
				
				this.data('fsbox').currentSlide = currentSlide.prevSlide
			}
		},
		
		next: function() {
			
			var currentSlide = this.data('fsbox').currentSlide
			
			if (currentSlide.nextSlide) {

				currentSlide.hide(function() { currentSlide.nextSlide.show() })
				
				this.data('fsbox').currentSlide = currentSlide.nextSlide
			}
		}
	}
	
	$.fn.fsbox = function(method) {
		
		return this.each(function() {
			
			var $this = $(this), data = $this.data('fsbox')
			
			if (methods[method])
				if (data) return methods[method].call($this)
				else $.error('fsbox is not initialized')
			else if (typeof method === 'object' || !method)
				methods.init.call($this)
			else
				$.error('Method ' +  method + ' does not exist on jQuery.fsbox')
		})
		
	}
	
	$.fn.fsbox.defaults = {autoSelector: '.fsbox'}
	
	$(document).ready(function() { $($.fn.fsbox.defaults.autoSelector).fsbox() })
		
}) (jQuery)