'use strict';
module.exports = function(grunt){
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns 
    require('load-grunt-tasks')(grunt);

    //Configure Tasks
    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            configFiles: { 
                files: [ 'gruntfile.js'],
                options: {
                  reload: true
                }
            },
            sass: {
                files: ['dev/sass/**/*.scss'],
                tasks: ['compass'],
                options : {
                    livereload : true
                }
            },
            js: {
                files: ['dev/scripts/**/*.js'],
                options : {
                    livereload : true
                }
            },
            html: {
                files: ['dist/**/*.html'],
                options : {
                    livereload : true
                }
            }
        },
        connect : {
            server: {
                options: {
                    port: 8080,
                    base: 'dist',
                    protocol:'http',
                    hostname:'localhost',
                    livereload:true,
                    open: true
                }
            }
        },
        compass: {                  // Task
            dev: {                   // Target
                options: {              // Target options
                    sassDir: 'dev/sass',
                    cssDir: 'dist/assets/css',
                    environment: 'development'
                }
            }
        },
        uglify: {
            dist: {
              files: {
                'dist/assets/js/scripts.js': ['dev/scripts/{,*}*.js']
              }
            }
        }
    });

    grunt.registerTask('minjs',['uglify:dist']);
    grunt.registerTask('build',['compass','uglify:dist']);

    //Register tasks
    grunt.registerTask('serve', [
        'compass',
        'connect',
        'watch'
    ]);
};

