/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({

		// Setting folder templates.
		dirs: {
			css: 'assets/css',
			js: 'assets/js'
		},

		// JavaScript linting with JSHint.
		jshint: {
			options: {
				'force': true,
				'boss': true,
				'curly': true,
				'eqeqeq': false,
				'eqnull': true,
				'es3': false,
				'expr': false,
				'immed': true,
				'noarg': true,
				'onevar': true,
				'quotmark': 'single',
				'trailing': true,
				'undef': true,
				'unused': true,
				'sub': false,
				'browser': true,
				'maxerr': 1000,
				globals: {
					'jQuery': false,
					'$': false,
					'Backbone': false,
					'_': false,
					'wp': false,
					'wc_bundle_params': false,
					'woocommerce_params': false,
					'woocommerce_admin_meta_boxes': true,
					'woocommerce_writepanel_params': false,
					'wc_composite_admin_params': false,
					'wc_bundle_admin_params': false,
					'wc_enhanced_select_params': false,
					'PhotoSwipe': true,
					'PhotoSwipeUI_Default': true
				},
			},
			all: [
				'!Gruntfile.js',
				'<%= dirs.js %>/*.js',
				'!<%= dirs.js %>/*.min.js'
			]
		},
		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},
			jsfiles: {
				files: [{
					expand: true,
					cwd: '<%= dirs.js %>',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: '<%= dirs.js %>',
					ext: '.min.js'
				}]
			}
		},

		// Watch changes for assets.
		watch: {
			js: {
				files: [
					'<%= dirs.js %>/*js'
				],
				tasks: ['uglify']
			}
		},

		// Generate POT files.
		makepot: {
			options: {
				type: 'wp-plugin',
				domainPath: 'languages',
				potHeaders: {
					'report-msgid-bugs-to': 'support@somewherewarm.gr',
				}
			},
			go: {
				options: {
					potFilename: 'woocommerce-product-bundles-top-add-to-cart-button.pot',
					exclude: [
						'languages/.*',
						'assets/.*',
						'node-modules/.*',
					]
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options:{
				text_domain: 'woocommerce-product-bundles-top-add-to-cart-button',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src:  [
					'**/*.php', // Include all files.
					'!node_modules/**' // Exclude node_modules/ dir.
				],
				expand: true
			}
		}
	});

	// Load NPM tasks to be used here.
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );

	// Register tasks.
	grunt.registerTask( 'dev', [
		'checktextdomain',
		'uglify',
	]);

	grunt.registerTask( 'default', [
		'dev',
		'makepot'
	]);

	grunt.registerTask( 'domain', [
		'checktextdomain'
	]);
};
