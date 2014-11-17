/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
define(
    [   
        'settings',
        'jquery'
    ],
    function(Settings, $) {
        "use strict";

        var Navigation = function() {

            /**
             * Constructor
             * @return {void}
             */
            (function(){
                this.$body = $(document.body);
                this.$el = $('#masthead');
                this.$wrap = $('#site-navigation');
                this.$wrap.find('ul').addClass('nav-menu');

                var height = -this.$wrap.height() + 88;
                if ( $('html').hasClass('admin-bar')) {
                    height += 46;
                }

                this.styleElement = document.createElement("style");
                this.styleElement.type = "text/css";

                document.getElementsByTagName("head")[0].appendChild(this.styleElement);

                if (Settings.breakpoint === 0) {
                    var innerStyles = '#site-navigation { -moz-transform: translate3d(0, '+height+'px, 0); -ms-transform: translate3d(0, '+height+'px, 0); -webkit-transform: translate3d(0, '+height+'px, 0);   transform: translate3d(0, '+height+'px, 0); }';    

                    if (this.styleElement.styleSheet) {
                        this.styleElement.styleSheet.cssText = innerStyles;
                    } else {
                        this.styleElement.innerHTML = innerStyles;
                    }

                    this.bindEvents();
                }

                this.$body.on('match:mobile', $.proxy(this._matchMobile, this));
                this.$body.on('unmatch:mobile', $.proxy(this._unmatchMobile, this));
                this._setupSmoothScroll();

            }.call(this));
        };

        Navigation.prototype = {

            _setupSmoothScroll: function() {                
                this.$wrap.on('click', '.inner-wrap .menu-item a', $.proxy(this._handleMenuItemClick, this));
            },

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
                $(window).off('scroll', $.proxy(this._setTopPosition, this));
            },

            /**
             * bind all the events for the menu
             * @return {void}
             */
            bindEvents: function() {
                this.unBindEvents();
                var transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'transition': 'transitionend'
                    },
                    transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

                this.$el.on('click', '.menu-toggle', $.proxy(this._handleClickToggle, this));
                this.$el.on(transitionEnd, $.proxy(this._handleTransitionEnd, this));
                if ($('body').hasClass('admin-bar')) {
                    $(window).on('scroll', $.proxy(this._setTopPosition, this));    
                }
            },

            _setTopPosition: function() {
                var top = window.scrollY,
                    currentTop = parseInt(this.$el.css('top'));

                if (top <= 46) {
                    this.$el.css({
                        top: 46 - top
                    });
                } else {
                    if (currentTop !== 0) {
                        this.$el.css({
                            top: 0
                        });    
                    }
                }
            },

            _matchMobile: function(evt) {
                this.bindEvents();
                var height = -this.$wrap.height() + 88,
                    innerStyles = '#site-navigation { -moz-transform: translate3d(0, '+height+'px, 0); -ms-transform: translate3d(0, '+height+'px, 0); -webkit-transform: translate3d(0, '+height+'px, 0);   transform: translate3d(0, '+height+'px, 0); }';    


                if ( $('html').hasClass('admin-bar')) {
                    height += 46;
                }

                if (this.styleElement.styleSheet) {
                    this.styleElement.styleSheet.cssText = innerStyles;
                } else {
                    this.styleElement.innerHTML = innerStyles;
                }
            },

            _unmatchMobile: function(evt) {
                if (this.styleElement.styleSheet) {
                    this.styleElement.styleSheet.cssText = '';
                } else {
                    this.styleElement.innerHTML = '';
                }
            },

            _handleMenuItemClick: function(evt) {
                var $el = $(evt.currentTarget),
                    href = $el.attr('href');

                if (href.indexOf('#') !== -1) {
                    $.smoothScroll({
                        scrollTarget: $el.attr('href').replace('/', ''),
                        offset: -100,
                        afterScroll: _.bind(function() {
                            this.$wrap.removeClass('menu-opened');
                            this.$el.find('.menu-opened').removeClass('menu-opened');
                            
                        }, this)
                    });    
                }
            },

            /**
             * when user clicks on the menu trigger, we add css class that triggers a css transition
             * @param  {Event} evt jQuery Event object
             * @return {void}
             */
            _handleClickToggle: function(evt) {
                evt.preventDefault();
                var $target = $(evt.currentTarget);

                this.$wrap.addClass('menu-transitioning');

                if (this.$wrap.hasClass('menu-opened')) {
                    this.$wrap.removeClass('menu-opened');
                    $target.removeClass('menu-opened');
                } else {
                    this.$wrap.addClass('menu-opened');
                    $target.addClass('menu-opened');
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

        return Navigation;
    }
);
