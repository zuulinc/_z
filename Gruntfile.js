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
                        'js/site/settings.js',
                        'js/site/navigation.js',
                        'js/site/customizer.js',
                        'js/site/main.js'
                    ],
                    'js/vendor.min.js': [
                        'js/vendor/**/*.js',
                        '!js/vendor/modernizr-latest.js'
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
                "devFile" : "js/vendor/modernizr-latest.js",

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

                parseFiles: true,
                files: {
                    src: [
                        'js/site/**/*.js'
                    ]
                }
            }

        }
    });

    grunt.registerTask('watch:dist', function() {
        var config = {
            options: {
                livereload: true
            },
            scss: {
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'modernizr:dist', 'uglify:dist']
            }
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });

    grunt.registerTask('build', [
        'modernizr:dist',
        'uglify:dist'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};