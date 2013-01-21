define(['imgslide', 'divslide'], function(ImgSlide, DivSlide) {(function($) {
	
	var createSlide = function($slide, box) {
		
		if ($slide.is('img')) return new ImgSlide($slide, box)
		else if ($slide.is('div')) return new DivSlide($slide, box)
		else return null
	}
	
	var FsBox = function($box, opts) {
		
		var params = {
			prevControlSelector: '.prev',
			nextControlSelector: '.next',
			closeBindTo: '.close a',
			prevBindTo: '.prev a',
			nextBindTo: '.next a',
			slidesSelector: '.slides > *'
		}
		
		if (typeof opts == 'object') $.extend(params, opts)
		
		var data = $box.data('fsbox')
		
		if (data && data.box) return data.box
		
		$box.detach()
			.css({position: 'absolute'})
			.appendTo($('body'))
			
		this.$prevControl = $box.find(params.prevControlSelector)
		this.$nextControl = $box.find(params.nextControlSelector)
		
		var self = this
		
		$box.find(params.closeBindTo).click(function() { self.close(); return false })
		$box.find(params.prevBindTo).click(function() { self.prev(); return false })
		$box.find(params.nextBindTo).click(function() { self.next(); return false })

		var prevSlide = null, currentSlide = null
		
		var slides = $box.find(params.slidesSelector).map(function() {

			var slide = createSlide($(this), self)
			
			$(this).hide()

			if (prevSlide) {
				
				prevSlide.setNextSlide(slide)
				
				slide.setPrevSlide(prevSlide)
				
			} else currentSlide = slide
			
			prevSlide = slide
			
			$(window).resize(function() { slide.center() })
			
			return slide
			
		}).get().filter(function(el) { return el !== null })
		
		$box.data('fsbox', { box: this })
		
		var bodyOverflow = null
		
		$.extend(this, {
			
			open: function(i) {
				
				bodyOverflow = $('body').css('overflow')
				$('body').css('overflow', 'hidden')
				
				$box.fadeIn()
				
				if (i !== undefined) currentSlide = slides[i]
				
				currentSlide.show()
			},
			
			close: function() {
				
				$box.trigger('close.fsbox', [currentSlide])
				
				$box.fadeOut()
				
				$('body').css('overflow', bodyOverflow)
				
				slides.forEach(function(slide) { slide.hide() })
			},
			
			prev: function() {
				
				if (currentSlide.prevSlide) {
					
					var prevSlide = currentSlide.prevSlide
					
					$box.trigger('prev.fsbox', [currentSlide, prevSlide])
					
					currentSlide.hide(function() { prevSlide.show() })
					
					currentSlide = currentSlide.prevSlide
				}
			},
			
			next: function() {
				
				if (currentSlide.nextSlide) {
					
					var nextSlide = currentSlide.nextSlide
					
					$box.trigger('next.fsbox', [currentSlide, nextSlide])
					
					currentSlide.hide(function() { nextSlide.show() })
					
					currentSlide = currentSlide.nextSlide
				}
			}			
		})
	}

	
	$.fn.fsbox = function(method) {
		
		var args = arguments
		
		return this.each(function() {
			
			var $this = $(this), data = $this.data('fsbox')
			
			if (data && data.box && data.box[method])
				return data.box[method].apply(data.box,
						Array.prototype.slice.call(args, 1))
			else if (typeof method === 'object' || !method) new FsBox($this, method)
			else $.error('Method ' +  method + ' does not exist on jQuery.fsbox')
		})
		
	}
	
	$.fn.fsbox.defaults = {autoSelector: '.fsbox'}
	
	$(document).ready(function() { $($.fn.fsbox.defaults.autoSelector).fsbox() })
		
}) (jQuery) })