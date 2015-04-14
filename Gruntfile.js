module.exports = function(grunt) {

    var BUILD_FILE_BASENAME = 'helpers';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'src/base.js',
                ],
                dest: BUILD_FILE_BASENAME + '.js',
            }
        },

        uglify: {
            build: {
                src: BUILD_FILE_BASENAME + '.js',
                dest: BUILD_FILE_BASENAME + '.min.js'
            }
        },

        clean: [ BUILD_FILE_BASENAME + '.js' ]

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['concat', 'uglify', 'clean']);

};