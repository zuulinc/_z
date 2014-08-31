/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
    "use strict";

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

        }.call(this));
    };

    Navigation.prototype = {

        /**
         * unbind all the events that have been created
         * @return {void}
         */
        unBindEvents: function() {
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                },
                transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

            this.$el.off('click', '.menu-toggle', $.proxy(this._handleClickToggle, this));
            this.$el.off(transitionEnd, $.proxy(this._handleTransitionEnd, this));
        },

        /**
         * bind all the events for the menu
         * @return {void}
         */
        bindEvents: function() {
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                },
                transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

            this.$el.on('click', '.menu-toggle', $.proxy(this._handleClickToggle, this));
            this.$el.on(transitionEnd, $.proxy(this._handleTransitionEnd, this));
        },

        /**
         * when user clicks on the menu trigger, we add css class that triggers a css transition
         * @param  {Event} evt jQuery Event object
         * @return {void}
         */
        _handleClickToggle: function(evt) {
            evt.preventDefault();

            this.$el.addClass('menu-transitioning');

            if (this.$el.hasClass('menu-opened')) {
                this.$el.removeClass('menu-opened');
            } else {
                this.$el.addClass('menu-opened');
            }
        },

        /**
         * When the transition finished we need to remove the css class that enables the transitions
         * @param  {Event} evt jQuery Event object
         * @return {void}
         */
        _handleTransitionEnd: function(evt) {
            this.$el.removeClass('menu-transitioning');
        }
    };

    new Navigation();

})();
