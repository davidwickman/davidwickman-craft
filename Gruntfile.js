/*
 * Generated on 2015-12-03
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.src %>/assets/scss/{,*/}*.scss'],
        tasks: ['sass:dev']
      },
      images: {
        files: ['<%= config.src %>/assets/images/**'],
        tasks: ['copy:images']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-middleware-sitemap'],
          permalinks: {
            structure: ':basename/index.html'
          },
          minify: {
            removeAttributeQuotes: false
          },
          helpers: ['handlebars-helper-minify'],
          sitemap: {
            removeindex: true,
            relativedest: true,
            dest: '<%= config.dist %>'
          }
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      images: {
        expand: true,
        cwd: '<%= config.src %>/assets/images/',
        src: '**',
        dest: '<%= config.dist %>/assets/images/'
      },
    },

    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          '<%= config.dist %>/assets/css/theme.css': '<%= config.src %>/assets/scss/theme.scss'
        }
      },
      prod: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          '<%= config.dist %>/assets/css/theme.css': '<%= config.src %>/assets/scss/theme.scss'
        }
      }

    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server:prod', [
    'build:prod',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass:dev',
    'assemble'
  ]);

  grunt.registerTask('build:prod', [
    'clean',
    'copy',
    'sass:prod',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
