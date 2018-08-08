const sass = require('node-sass');

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
            scss: {
                files: ['dev/scss/**/*.scss'],
                tasks: ['sass'],
                options : {
                    livereload : true
                }
            },
            js: {
                files: ['dev/scripts/**/*.js'],
                tasks: ['minjs','copy'],
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
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                livereload: true,
            },
            dist: {
                files : {
                    'dist/assets/css/index.css':'dev/scss/index.scss'
                }
            },
        },
        copy: {
            options: {
                punctuation: ''
            },
            files: {
                cwd: 'dev/scripts',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'dist/assets/js',    // destination folder
                expand: true           // required when using cwd
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
    grunt.registerTask('build',['sass','uglify:dist']);
    grunt.registerTask('default',['sass']);

    //Register tasks
    grunt.registerTask('serve', [
        'sass',
        'connect',
        'watch'
    ]);
};

