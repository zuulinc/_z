/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
    "use strict";

    /*
    on click of the button
        - add the moving class
        - and the open or closed class

    on transition end
        - remove the moving class
     */
    
    var Navigation = function() {

        /**
         * Constructor
         * @return {void}
         */
        (function(){
            this.$body = $(document.body);
            this.$el = $('#site-navigation');
            this.$el.find('ul').addClass('nav-menu');

            this.$body.on('match:mobile', $.proxy(this.bindEvents, this));
            this.$body.on('unmatch:mobile', $.proxy(this.unBindEvents, this));

            if (Settings.breakpoint === 0) {
                this.bindEvents();    
            }

        }.call(this));
    };

    Navigation.prototype = {

        unBindEvents: function() {
            console.log('%cUnbind...', 'background-color:red;color:white;padding:2px;');
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                },
                transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

            this.$el.off('click', '.menu-toggle', $.proxy(this._handleClickToggle, this));
            this.$el.off(transitionEnd, $.proxy(this._handleTransitionEnd, this));    
        },

        bindEvents: function() {
            console.log('%cbinding...', 'background-color:red;color:white;padding:2px;');
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                },
                transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

            if (0 === Settings.breakpoint) {
                this.$el.on('click', '.menu-toggle', $.proxy(this._handleClickToggle, this));
                this.$el.on(transitionEnd, $.proxy(this._handleTransitionEnd, this));    
            }
        },

        _handleClickToggle: function(evt) {
            evt.preventDefault();

            this.$el.addClass('menu-transitioning');

            if (this.$el.hasClass('menu-opened')) {
                this.$el.removeClass('menu-opened');    
            } else {
                this.$el.addClass('menu-opened');
            }
        },

        _handleTransitionEnd: function(evt) {
            this.$el.removeClass('menu-transitioning');
        }
    };

    new Navigation();

})();
