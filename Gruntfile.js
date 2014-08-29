"use strict";
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var setup = {
        wwwroot: ''
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        config: {
            wwwroot: setup.wwwroot
        },

        deploy: {
            staging: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc']
            },
            production: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: '<%= rsync.staging.exclude %>'
            }
        },

        compass: {
            options: {
                config: 'config.rb'
            },
            server: {
                options: {
                    environment: 'development'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scss: {
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },

            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint']
            }
        },

        uglify: {
            dist: {
                files: {
                    'js/site.min.js': [
                        'js/site/**/*.js'
                    ],
                    'js/vendor.min.js': [
                        'js/vendor/**/*.js'
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: '**/*',
                    dest: 'images/'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'js/site/**/*.js',
                '!js/vendor/**/*.js'
            ]
        },

        modernizr: {

            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile" : "js/modernizr-dev.js",

                // [REQUIRED] Path to save out the built file.
                "outputFile" : "js/vendor/modernizr.js",

                // Based on default settings on http://modernizr.com/download/
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : true,
                    "mq" : false,
                    "cssclasses" : true
                },

                // Based on default settings on http://modernizr.com/download/
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false
                }
            }

        }
    });

   

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};