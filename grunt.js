module.exports = function(grunt) {
	
	grunt.initConfig({

    requirejs: {
    	
    	compile: {
    		
    		options: {
    			
    			baseUrl: 'src',
    			dir: 'build',
    			name: 'fsbox',
    			optimize: 'none'
    		}
    	}
    },
    
    min: {'build/fsbox.min.js': 'build/fsbox.js'}
  })

  grunt.loadNpmTasks('grunt-contrib-requirejs')

  grunt.registerTask('default', 'requirejs min')

};