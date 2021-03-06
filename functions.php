<?php
/**
 * Sprout functions and definitions
 *
 * @package Sprout
 */


/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 1000; /* pixels */
}

if ( ! function_exists( 'sprout_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function sprout_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on sprout, use a find and replace
	 * to change 'sprout' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'sprout', get_template_directory() . '/languages' );


	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'sprout' ),
		'service' => esc_html__( 'Services Menu', 'sprout' ),
	) );

	/*
	 * Custom image sizes
	 */
	// blog thumb gets used on Index page - replace with gallery thumb?
	add_image_size( 'sprout-blog-thumb', 858, 572, true );

	// Square for Isotope gallery
	add_image_size( 'sprout-square', 1024, 1024, true );

	// header-slider image size
	add_image_size( 'sprout-gallery-slider', 1920, 1280, true );

	//basic image dimension - horizontal - based off of a 2560x1600 ratio
	add_image_size( 'sprout-medium-sm', 300, 225, true );

	update_option( 'medium_size_w', 640 );
	update_option( 'medium_size_h', 480 );

	if(!get_option("medium_crop")) {
		add_option("medium_crop", "1");
	} else {
		update_option("medium_crop", "1");
	}

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.WordPress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );


	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'sprout_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	/*
	 * Enable custom stylesheet file to the TinyMCE editor within the post edit screen
	 */
	add_editor_style( 'css/wp-core/custom-editor-style.css' );
}
endif; // sprout_setup
add_action( 'after_setup_theme', 'sprout_setup' );



/**
 * Styles and scripts
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_scripts_styles.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_scripts_styles.php' );
}

/**
 * Custom Styles for Redux
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/custom-styles/custom-styles.php') ) {
	require_once( get_template_directory() . '/inc/custom-styles/custom-styles.php' );
}


/**
 * ACF Custom Post Types
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_acf.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_acf.php' );
}

/**
 * Theme Init: functions to start right away
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_theme_init.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_theme_init.php' );
}


/**
 * Widgets & Sidebars
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_widgets.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_widgets.php' );
}


/**
 * Extras: Custom functions that act independently of the theme templates.
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_extras.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_extras.php' );
	require_once( get_template_directory() . '/inc/functions/sprout_breadcrumbs.php' );
}


/**
 * Template Functions for this theme.
 *
 * @since 1.0.0
 */
if ( file_exists(get_template_directory() . '/inc/functions/sprout_template_functions.php') ) {
	require_once( get_template_directory() . '/inc/functions/sprout_template_functions.php' );
}


/**
 * Custom Nav Template
 *
 * @since 1.0.0
 */
require_once get_template_directory() . '/inc/custom-menu/custom-menu-fields.php';


/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer/customizer.php';


/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack/jetpack.php';


/**
 * Load Plugin Activation
 */
require_once get_template_directory() . '/inc/tgm/class-tgm-plugin-activation.php';
require_once get_template_directory() . '/inc/tgm/plugin-activation.php';


/**
 * Redux Activation
 */
if ( !isset( $redux_demo ) && file_exists( get_template_directory() . '/redux/sample/barebones-config.php' ) ) {
	require_once (get_template_directory() . '/redux/sample/barebones-config.php');
//	require_once (get_template_directory() . '/redux/sample/sample-config.php');
}

// 3. Hide ACF field group menu item
function remove_acf(){
	remove_menu_page( 'edit.php?post_type=acf' );
}
add_action( 'admin_menu', 'remove_acf',100 );

// 3. Hide ACF field group menu item
add_filter('acf/settings/show_admin', '__return_false');
