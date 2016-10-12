module.exports = function(grunt){
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          open: true,
        }
      }
    },
    less: {
      dev: {
        options: {
          paths: ['css'],
          compress: false,
          modifyVars: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'public/css/app.css': 'client/less/app.less'
        }
      },
      prod: {
        options: {
          paths: ['css'],
          compress: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ['last 5 version']})
          ],
          modifyVars: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'public/css/app.min.css': 'client/less/app.less'
        }
      }
    },
    concat: {
      app: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'client/js/app.js'
        ],
        dest: 'public/js/app.js'
      },
      ie: {
        src: [
          'node_modules/html5shiv/dist/html5shiv.js',
          'node_modules/es5-shim/es5-shim.js',
          'node_modules/json3/lib/json3.js'
        ],
        dest: 'public/js/ie.js'
      }
    },
    uglify: {
      prod: {
        options: {
          mangle: false
        },
        files: {
          'public/js/app.min.js': 'public/js/app.js',
          'public/js/ie.min.js': 'public/js/ie.js'
        }
      }
    },
    ejs: {
      dev: {
        options: {
          env: 'dev',
          version: '<%= pkg.version %>',
          title: '<%= pkg.name %>',
          css: 'app.css',
          js: 'app.js',
          ie: 'ie.js'
        },
        src: 'client/ejs/index.ejs',
        dest: 'public/index.html',
        expand: false
      },
      prod: {
        options: {
          env: 'prod',
          version: '<%= pkg.version %>',
          title: '<%= pkg.name %>',
          css: 'app.min.css',
          js: 'app.min.js',
          ie: 'ie.min.js'
        },
        src: 'client/ejs/index.ejs',
        dest: 'public/index.html',
        expand: false
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['client/js/**'],
        tasks: ['concat:app']
      },
      less: {
        files: ['client/less/**'],
        tasks: ['less:dev']
      },
      ejs: {
        files: ['client/ejs/**'],
        tasks: ['ejs:dev']
      }
    }
  });

  grunt.registerTask('default', [
    'ejs:dev',
    'less:dev',
    'concat',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'ejs:prod',
    'less:prod',
    'concat',
    'uglify:prod'
  ]);

};