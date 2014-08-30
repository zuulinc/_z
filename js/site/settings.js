"use strict";
var Settings = {
    $body: jQuery(document.body),
    breakpoint: -1,
    breakpoints: {
        mobile: {
            selector: 'screen and (min-width: 320px) and (max-width: 767px)',
            match: function() {
                Settings.breakpoint = 0;
                Settings.$body.trigger('match:mobile');
            },
            setup: function() {
                Settings.$body.trigger('match:mobile');
            },
            unmatch: function() {
                Settings.$body.trigger('unmatch:mobile');
            }
        },
        tablet: {
            selector: 'screen and (min-width: 768px) and (max-width: 959px)',
            match: function() {
                Settings.breakpoint = 1;
                Settings.$body.trigger('match:tablet');
            }
        },
        desktop: {
            selector: 'screen and (min-width: 960px)',
            match: function() {
                Settings.breakpoint = 2;
                Settings.$body.trigger('match:desktop');
            }
        }
    }
};
