/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! Pupil - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Miikka Virtanen; Licensed MIT */\n',
    // Task configuration.
    concat: {
      /*options: {
        banner: '<%= banner %>',
        stripBanners: true
      },*/
      dist: {
        src: [
            'js/Init.js',
            'js/Exception.js',
            'js/LexerException.js',
            'js/ParserException.js',
            'js/ValidatorException.js',
            'js/Lexer.js',
            'js/Block.js',
            'js/BlockFactory.js',
            'js/Parser.js',
            'js/Validator.js'
        ],
        dest: 'js-release/PupilFull.js'
      }
    },
    uglify: {
      /*options: {
        banner: '<%= banner %>'
      },*/
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js-release/PupilFull.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
