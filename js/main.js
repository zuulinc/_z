require.config({
	baseUrl: '/wp-content/themes/_z/',
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		jquery: 'js/vendor/jquery-2.1.1.min',
		underscore: 'js/vendor/underscore-min',
		enquire: 'js/vendor/enquire.min',
		settings: 'js/site/settings',
		smoothscroll: 'js/vendor/jquery-smoothscroll',
		site: 'js/site',
		async: 'js/vendor/require-async'
	},
	shim: {
		'smoothscroll': ['jquery'],
		'site': {
			deps: ['jquery', 'underscore', 'enquire', 'settings', 'smoothscroll']
		}
	}
});

// libs
require(['site'], function(Site) {
	Site.init();
});