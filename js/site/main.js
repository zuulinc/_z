"use strict";
(function() {
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

}());