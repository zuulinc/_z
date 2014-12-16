"use strict";
var _ = require('underscore');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var setup = {
        wwwroot: ''
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            js: {
                files: [
                    'Gruntfile.js',
                    'js/site/**/*.js',
                    '!js/vendor/**/*.js'
                ],
                updated: ['<%= paths.js.files %>']
            }
        },

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
            force: {
                options: {
                    force: true,
                    environment: 'development'
                }
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
                files: ['<%= paths.js.files %>'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
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
            all: {
                src : ['<%= paths.js.updated %>']
            }
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

        },

        activate: {
            options: {
                plugins: [
                    {
                        source: '/Users/keith/Projects/wordpress/plugins/carousels',
                        js: {
                            vendor: ['js/vendor/owl-carousel/owl.carousel.min.js'],
                            user: ['js/carousel-main.js']
                        },
                        name: 'carousels'
                    },
                    {
                        source: '/Users/keith/Projects/wordpress/plugins/foo',
                        name: 'foo',
                        js: {
                            vendor: ['foo.js'],
                            user: ['site.js']
                        }
                    }
                ],
                theme: {
                    source: '/Users/keith/Projects/wordpress/themes/_z',
                    name: '_z'
                },
                wpDIR: '/Users/keith/Sites/wordpress'    
            },
            all: {

            }
            
        },

        browserSync: {
            dev: {
                files: {
                    src: '<%= jshint.all.src.concat(["./**/*.php"]) %>'
                },
                bsFiles: {
                    src : 'style.css'
                },
                options: {
                    proxy: "local.underscorez.ca",
                    watchTask: true
                }
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        // Determine task based on filepath
        var get_ext = function(path) {
            var ret = '';
            var i = path.lastIndexOf('.');
            if ( -1 !== i && i <= path.length ) {
                ret = path.substr(i + 1);
            }
            return ret;
        };

        switch ( get_ext(filepath) ) {
            // JavaScript
            case 'js':
                grunt.config.set('paths.js.updated', [filepath]);
                break;
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
        'updatejs',
        'modernizr:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('updatejs', 'Updates the vendor scripts from the plugins', function(){
        var userScripts = grunt.config.get('uglify.dist.files')['js/site.min.js'],
            vendorScripts = grunt.config.get('uglify.dist.files')['js/vendor.min.js'],
            plugins = grunt.config.get('activate.options.plugins'),
            uglify = {};

        _.each(plugins, function(plugin) {
            _.each(plugin.js.user, function(file){
                userScripts.push(plugin.source + '/' + file);
            });
        });

        _.each(plugins, function(plugin) {
            _.each(plugin.js.vendor, function(file){
                vendorScripts.push(plugin.source + '/' + file);
            });
        });

        uglify['js/site.min.js'] = userScripts;
        uglify['js/vendor.min.js'] = vendorScripts;

        grunt.config.set('uglify.dist.files', uglify);
    });

    // Default task(s).
    grunt.registerTask('watch-sync', ['browserSync', 'watch']);
    grunt.registerTask('default', ['activate', 'watch']);

};