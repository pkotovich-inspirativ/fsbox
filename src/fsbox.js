
define([], function() {(function($) {
		
	var methods = {
			
		init: function(data) {
			
			if (!data) {
				
				this.data('fsbox', {})
				
				this.detach()
					.css({position: 'absolute'})
					.appendTo($('body'))
					
				var box = this
				
				this.find('.close a').click(function() { box.hide() })
				
				this.find('.slides > *').hide()
			}
		},
		
		show: function() { this.show() },
		hide: function() { this.hide() },
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
		
}) (jQuery) })