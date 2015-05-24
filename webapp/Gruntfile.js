'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    browserify: {
      main: {
        src: '<%= pkg.src %>/main/js/index.js',
        dest: '<%= pkg.devDest %>/main/js/main.js'
      },
      accounts: {
        src: '<%= pkg.src %>/accounts/js/index.js',
        dest: '<%= pkg.devDest %>/accounts/js/main.js'
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

    watch: {
      mainjs : {
        files: ['<%= pkg.src %>/main/js/{,*/}*.js'],
        tasks: ['browserify:main'],
        options: {
          livereload: true,
        }
      },
      accountsjs: {
        files: ['<%= pkg.src %>/accounts/js/{,*/}*.js'],
        tasks: ['browserify:accounts']
      },
      scss: {
        files: ['<%= pkg.sassDir %>/{,*/}*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true,
        }
      },
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
    'watch',
  ]);

};
