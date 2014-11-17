define(
	[ 
		'jquery',
		'settings',
		'enquire',
		'js/site/navigation'
	],
	function ( $, Settings, enquire, Navigation ) {
	    "use strict";


		return {
			init: function() {

				this._setupBreakpoints();
				this.navigation = new Navigation();
				

				this._getLocation(_.bind(function(){

					console.log('%cGot the Location', 'background-color:red;color:white;padding:2px;');

				}, this));

				
			},

			_getLocation: function(callback) {
				navigator.geolocation.getCurrentPosition(_.bind(function(location){
				    if (callback) {
				    	callback();
				    }
				}, this));
			},

			/**
			 * Setting up the breakpoints so we can turn on and off js logic depending on what the breakpoint is.
			 * @return {[type]} [description]
			 */
			_setupBreakpoints: function() {
				_.each(Settings.breakpoints, function(breakpoint){
				    enquire.register(breakpoint.selector, {
				        match: function() {
				            if (breakpoint.match) {
				                breakpoint.match();    
				            }
				        },
				        unmatch: function() {
				            if (breakpoint.unmatch) {
				                breakpoint.unmatch();    
				            }
				        },
				        setup: function() {
				            if (breakpoint.setup) {
				                breakpoint.setup();
				            }
				        },
				        deferSetup: true,
				        destroy: function() {}
				    });
				});
			}
		};
	}
);