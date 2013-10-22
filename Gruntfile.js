module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: [
			'lib/**/*',
			'dist/**/*',
			'!lib/.gitignore',
			'!dist/.gitignore',
		],

		concat: {
			options: {
				banner:   '/**\n'
						+ ' * HiDPI Canvas Polyfill (<%= pkg.version %>)\n'
						+ ' *\n'
						+ ' * Author: <%= pkg.author %>\n'
						+ ' * Homepage: <%= pkg.homepage %>\n'
						+ ' * Issue Tracker: <%= pkg.bugs %>\n'
						+ ' * License: <%= pkg.license %>\n'
						+ '*/\n',
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/hidpi-canvas.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= concat.options.banner %>'
			},
			dist: {
				files: {
					'dist/hidpi-canvas.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		compress: {
			main:{
				options: {
					mode: 'gzip'
				},
				expand: true,
				cwd: 'dist',
				src: ['*.js'],
				dest: 'dist/'
			},
			dist: {
				options: {
					archive: 'dist/hidpi-canvas-<%= pkg.version %>.zip',
					level: 9
				},
				files: [
					{
						src: [
							'LICENSE.txt',
							'README.md',
							'CHANGELOG'
						]
					},
					{
						expand: true,
						cwd: 'dist/',
						src: [
							'*.js',
							'*.js.gz'
						]
					}
				]
			},
		},

		qunit: {
			files: [
				'test/CanvasRenderingContext2D.html',
				'test/HTMLCanvasElement.html'
			]
		},

		watch: {
			files: ['<%= concat.dist.src %>'],
			tasks: ['clean', 'concat:dist']
		}
	});

	// Load Package Tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Define Custom Tasks
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('default', ['clean', 'concat:dist', 'test']);
	grunt.registerTask('dist', ['default', 'uglify:dist', 'compress', 'compress:dist']);
};
