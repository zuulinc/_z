define([
	'jquery',
	'underscore'
	],
	function($, _){

	"use strict";
	var View = function() {
		if (this.$el) {
			this.el = this.$el.get(0);
		}

		this.initialize.apply(this, arguments);
		this.delegateEvents();
	};

	View.prototype = {
		$el: null,
		el: null,
		initialize: function() {},
		events: {},
		delegateEvents: function(events) {

			var delegateEventSplitter = /^(\S+)\s*(.*)$/,
				match,
				eventName,
				selector,
				method;

			if (!(events || (events = _.result(this, 'events')))) { 
				return this;
			}
			this.undelegateEvents();
			for(var evt in events) {
				if (typeof(evt) === 'string') {
					method = events[evt];
					if (!_.isFunction(method)) {
						method = this[events[evt]];	
					} 
					if (!method) {
						continue;
					}

					match = evt.match(delegateEventSplitter);
					eventName = match[1];
					selector = match[2];
					method = _.bind(method, this);
					eventName += '.delegateEvents' + this.cid;
					if (selector === '') {
						this.$el.on(eventName, method);
					} else {
						this.$el.on(eventName, selector, method);
					}	
				}
				
			}
		},
		undelegateEvents: function() {
			this.$el.off('.delegateEvents' + this.cid);
			return this;
		},
	};

	return View;
	
});