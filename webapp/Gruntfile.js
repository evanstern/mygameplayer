'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ],
        alias: {
          'underscore': 'lodash'
        }
      },
      main: {
        src: '<%= pkg.src %>/javascript/main/index.js',
        dest: '<%= pkg.devDest %>/javascript/main/main.js'
      },
      accounts: {
        src: '<%= pkg.src %>/javascript/accounts/index.js',
        dest: '<%= pkg.devDest %>/javascript/accounts/main.js'
      },
      home: {
        src: '<%= pkg.src %>/javascript/home/index.js',
        dest: '<%= pkg.devDest %>/javascript/home/main.js'
      }
    },

    compass: {
      dev: {
        options: {
          require: ['susy'],
          importPath: ['<%= pkg.bowerDir %>/bootstrap-sass/assets/stylesheets/'],
          sassDir: '<%= pkg.sassDir %>',
          cssDir: '<%= pkg.cssDir %>',
          environment: 'development'
        }
      }
    },

    react: {
      files: {
        expand: true,
        cwd: '<%= pkg.src %>/javascript/',
        src: '**/*.jsx',
        dest: '<%= pkg.src %>/javascript/',
        ext: '.js'
      }
    },

    watch: {
      mainjs: {
        files: ['<%= pkg.src %>/javascript/main/{,*/}*.js'],
        tasks: ['browserify:main'],
        options: {
          livereload: true
        }
      },
      accountsjs: {
        files: ['<%= pkg.src %>/javascript/accounts/{,*/}*.js'],
        tasks: ['browserify:accounts']
      },
      homejs: {
        files: ['<%= pkg.src %>/javascript/home/**/*.js'],
        tasks: ['browserify:home']
      },
      react: {
        files: ['<%= pkg.src %>/javascript/**/*.jsx'],
        tasks: ['react']
      },
      scss: {
        files: ['<%= pkg.sassDir %>/{,*/}*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      }
    },

    copy: {
      collectstatic: {
        files: [{
          expand: true,
          cwd: '<%= pkg.bowerDir %>/bootstrap-sass/assets/fonts',
          src: '*/*',
          dest: '<%= pkg.fontsDir %>'
        }]
      }
    },

    clean: {
      dev: '.tmp'
    }
  });

  grunt.registerTask('default', [
    'clean:dev',
    'browserify',
    'compass:dev',
    'copy:collectstatic',
    'watch'
  ]);

};
