<?php
/**
 *
 * Scripts and Styles
 *
 * @since  1.0.0
 *
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) { die; }


/**
 *
 * Scripts: Frontend with no conditions, Add Custom Scripts to wp_head
 *
 * @since  1.0.0
 *
 */
add_action('wp_enqueue_scripts', 'neat_scripts');
function neat_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {


    	wp_enqueue_script('jquery'); // Enqueue it!
//        wp_register_script('jReady', get_template_directory_uri() . '/assets/js/vendor/readyFn.js', array('jquery'), '1.1', true);
//        wp_enqueue_script('jReady'); // Enqueue it!

//        wp_register_script('imagesLoaded', get_template_directory_uri() . '/assets/js/vendor/imagesloaded.pkgd.min.js', array('jquery'), '1.1', true);
//        wp_enqueue_script('imagesLoaded'); // Enqueue it!

//        wp_register_script('isotope', 'https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.js', array('jquery'), '1.1', true);
//        wp_register_script('isotope-neat', get_template_directory_uri() . '/assets/js/vendor/isotope.min.js', array('jquery'), '1.1', true);
//        wp_enqueue_script('isotope-neat'); // Enqueue it!

        wp_register_script('fontawesome', 'https://use.fontawesome.com/c1013b11d0.js', '', '4', true);
        wp_enqueue_script('fontawesome'); // Enqueue it!

//        wp_register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js', '', '1.2.3', true);
        wp_register_script('gsap', get_template_directory_uri() . '/node_modules/gsap/src/minified/TweenMax.min.js', '', '1.2.3', true);
        wp_enqueue_script('gsap'); // Enqueue it!

        wp_register_script('gsap-scrollTo', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/plugins/ScrollToPlugin.min.js', '', '1.2.3', true);
        wp_enqueue_script('gsap-scrollTo'); // Enqueue it!
        //
//        wp_register_script('smoothstate', 'https://cdn.jsdelivr.net/jquery.smoothstate/0.7.2/jquery.smoothState.min.js', array('jquery'), '0.7.2', true);
        wp_register_script('smoothstate', get_template_directory_uri() . '/node_modules/smoothstate/jquery.smoothState.min.js', array('jquery'), '0.7.2', true);
        wp_enqueue_script('smoothstate'); // Enqueue it!

        wp_register_script('scrollmagic', get_template_directory_uri() . '/assets/js/vendor/scrollmagic/ScrollMagic.min.js', array('jquery'), '0.7.2', true);
        wp_enqueue_script('scrollmagic'); // Enqueue it!

        wp_register_script('scrollmagic-debug', get_template_directory_uri() . '/assets/js/vendor/scrollmagic/plugins/debug.addIndicators.min.js', array('jquery'), '0.7.2', true);
        wp_enqueue_script('scrollmagic-debug'); // Enqueue it!

        wp_register_script('scrollmagic-gsap', get_template_directory_uri() . '/assets/js/vendor/scrollmagic/plugins/animation.gsap.min.js', array('jquery'), '0.7.2', true);
        wp_enqueue_script('scrollmagic-gsap'); // Enqueue it!

        wp_register_script('modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.js', '', '2.8.3');
        wp_enqueue_script('modernizr'); // Enqueue it!

        //wp_deregister_script('jquery'); // Deregister WordPress jQuery
        //wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', array(), '1.11.2');


        /**
         *
         * Minified and concatenated scripts
         *
         *     @vendors     plugins.min,js
         *     @custom      scripts.min.js
         *
         *     Order is important
         *
         */
        wp_register_script('neat_vendorsJs', get_template_directory_uri() . '/assets/js/neat-vendors.min.js', array('jquery'), '1.1', true); // Custom scripts
        wp_enqueue_script('neat_vendorsJs'); // Enqueue it!

        wp_register_script('neat_customJs', get_template_directory_uri() . '/assets/js/custom/neat-custom.js', array('jquery', 'gsap'), '1.1', true); // Custom scripts
        wp_enqueue_script('neat_customJs'); // Enqueue it!

        /**
         *
         * Separate Vendor scripts
         *
         */


        /**
         *
         * Enqueue HTML5Shiv and Respond.js IE less than 9
         *
         */
        wp_register_style( 'ie_html5shiv', get_template_directory_uri() . '/js/html5shiv.js' );
        wp_enqueue_style( 'ie_html5shiv');
        wp_style_add_data( 'ie_html5shiv', 'conditional', 'lt IE 9' );

        wp_register_style( 'ie_respond', get_template_directory_uri() . '/js/respond.min.js' );
        wp_enqueue_style( 'ie_respond');
        wp_style_add_data( 'ie_respond', 'conditional', 'lt IE 9' );

    }

}


/**
 *
 * Styles: Frontend with no conditions, Add Custom styles to wp_head
 *
 * @since  1.0
 *
 */
add_action('wp_enqueue_scripts', 'neat_styles'); // Add Theme Stylesheet
function neat_styles()
{

    /**
     *
     * Framework styles
     *
     */
    wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap/bootstrap.min.css', '3.6', 'all' );


//    wp_register_style('animsition-css', get_template_directory_uri() . '/assets/css/animsition/animsition.css', '', '1.2.3', true);
//    wp_enqueue_style('animsition-css'); // Enqueue it!

    /**
     *
     * Minified and Concatenated styles
     *
     */
    wp_register_style('neat_style', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
    wp_enqueue_style('neat_style'); // Enqueue it!


    /**
     *
     * IE9 Styles
     *
     */
    // Internet Explorer specific stylesheet
    wp_enqueue_style( 'neat_ie9', get_stylesheet_directory_uri() . "/ie9-styles.css", array( 'neat_style' )  );
    wp_style_add_data( 'neat_ie9', 'conditional', 'lte IE 9' );


    /**
     *
     * Google fonts
     * Must be included this way to avoid Firefox issues - included in styles.css
     *
     */
    // wp_register_style('neat_gfonts', 'http://fonts.googleapis.com/css?family=Open+Sans:300,800,400', array(), '1.0', 'all');
    // wp_enqueue_style('neat_gfonts'); // Enqueue it!


    /**
     *
     * Non-minified or non-concatenated styles
     *
     */

    // wp_register_style('neat_xyz_css', get_template_directory_uri() . '/assets/css/vendor/xyz.css', array(), '1.0', 'all');
    // wp_enqueue_style('neat_xyz_css'); // Enqueue it!



}

/**
 *
 * Custom Css styles for Admin
 *
 * @since  1.0.0
 *
 */

function neat_load_custom_wp_admin_style() {
    wp_register_style( 'neat_admin_css', get_template_directory_uri() . '/assets/css/wp-core/neat-admin-style.css', false, '1.0.0' );
    wp_enqueue_style( 'neat_admin_css' );

}
add_action( 'admin_enqueue_scripts', 'neat_load_custom_wp_admin_style' );

/**
 *
 * Comment Reply js to load only when thread_comments is active
 *
 * @since  1.0.0
 *
 */
function neat_enqueue_comments_reply() {
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'neat_enqueue_comments_reply' );


/**
 * Register and enqueue FontAwesome in the WordPress admin.
 */
function neat_enqueue_custom_admin_scripts() {
    wp_register_script('fontawesome', 'https://use.fontawesome.com/c1013b11d0.js', '', '4', true);
    wp_enqueue_script('fontawesome'); // Enqueue it!

}
add_action( 'admin_enqueue_scripts', 'neat_enqueue_custom_admin_scripts' );
