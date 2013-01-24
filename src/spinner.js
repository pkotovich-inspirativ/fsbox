define([], function() { return (function($) {

	return function($spinner) {
		
		var clients = new Array()
		
		$.extend(this, {
			
			show: function(client) {
				
				clients.push(client)
				$spinner.show()
			},
			
			hide: function(client) {
				
				var clientIndex = $.inArray(client, clients)
				
				delete clients[clientIndex]
				
				if ($.grep(clients, function(el) { return el !== undefined }).length == 0)
					$spinner.hide()
			}
		})
	}
})(jQuery) })