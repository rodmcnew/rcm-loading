module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                dist : {
                    options: {
                        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                        mangle: false,
                        sourceMap: true,
                        sourceMapName: 'dist/<%= pkg.name %>.map'
                    },
                    files: {
                        'dist/<%= pkg.name %>.min.js': [
                            'src/rcm-loading.js',
                            'src/rcm-loading-params.js',
                            'src/rcm-loading-tracker.js',
                            'src/rcm-loading-service.js'
                        ],
                        'dist/angular-rcm-loading.js': ['src/angular-rcm-loading.js'],
                        'dist/jquery-loader.js': ['src/jquery-loader.js']
                    }
                }
            },
            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/template',
                            src: '**',
                            dest: 'dist/template'
                        }
                    ]
                }
            },
            less: {
                development: {
                    options: {
                        compress: false,
                        yuicompress: false,
                        optimization: 2
                    },
                    files: {
                        "dist/template/default/loading.css": "src/template/default/loading.less" // destination file and source file
                    }
                }
            },
            concat: {
                options: {
                },
                dist: {
                    src: [
                        'src/rcm-loading.js',
                        'src/rcm-loading-params.js',
                        'src/rcm-loading-tracker.js',
                        'src/rcm-loading-service.js'
                    ],
                    dest: 'dist/<%= pkg.name %>.js'
                }
            }
        }
    );

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy', 'less', 'concat']);
};
