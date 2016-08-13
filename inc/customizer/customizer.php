<?php
/**
 * Sprout Theme Customizer.
 *
 * @package Sprout
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */

/******************************************************************************/
/*********************** THEME CUSTOMIZER SETTINGS ****************************/
/******************************************************************************/
function sprout_register_theme_customizer( $wp_customize ){

    /////////////////////////////
    // Default Settings
    /////////////////////////////
    $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
    $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
    $wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

    $wp_customize->add_panel( 'general_settings', array(
        'priority' => 5,
        'theme_supports' => '',
        'title' => esc_html__( 'General Settings', 'sprout' ),
        'description' => esc_html__( 'Global Theme Settings.', 'sprout' ),
    ) );

    /////////////////////////////
    // Remove Settings
    /////////////////////////////
    $wp_customize->remove_section("title_tagline");
    $wp_customize->remove_section("colors");
    $wp_customize->remove_control("header_image");
    $wp_customize->remove_section("background_image");

}

add_action( 'customize_register', 'sprout_register_theme_customizer');

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function sprout_customize_preview_js() {
	wp_enqueue_script( 'sprout_customizer', get_template_directory_uri() . '/assets/js/wp-core/customizer.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', 'sprout_customize_preview_js' );

function sprout_custom_header_and_background() {
    $default_background_color = '#fff';
    $default_text_color       = '#000';

    /**
     * Filter the arguments used when adding 'custom-background' support in The Sprout Theme.
     *
     * @since 1.0
     *
     * @param array $args {
     *     An array of custom-background support arguments.
     *
     *     @type string $default-color Default color of the background.
     * }
     */
    add_theme_support( 'custom-background', apply_filters( 'sprout_custom_background_args', array(
        'default-color' => $default_background_color,
    ) ) );

    /**
     * Filter the arguments used when adding 'custom-header' support.
     *
     * @since 1.0
     *
     * @param array $args {
     *     An array of custom-header support arguments.
     *
     *     @type string $default-text-color Default color of the header text.
     *     @type int      $width            Width in pixels of the custom header image. Default 1200.
     *     @type int      $height           Height in pixels of the custom header image. Default 280.
     *     @type bool     $flex-height      Whether to allow flexible-height header images. Default true.
     *     @type callable $wp-head-callback Callback function used to style the header image and text
     *                                      displayed on the blog.
     * }
     */
    add_theme_support( 'custom-header', apply_filters( 'sprout_custom_header_args', array(
        'default-text-color'     => $default_text_color,
        'width'                  => 1200,
        'height'                 => 280,
        'flex-height'            => true,
        'wp-head-callback'       => 'sprout_header_style',
    ) ) );
}
add_action( 'after_setup_theme', 'sprout_custom_header_and_background' );

if ( ! function_exists( 'sprout_header_style' ) ) :
    /**
     * Styles the header image and text displayed on the blog
     *
     * @see sprout_custom_header_setup().
     */
    function sprout_header_style() {
        // If the header text option is untouched, let's bail.
        if ( display_header_text() ) {
            return;
        }

        // If you want to add a header - customize style here.
        ?>
        <style type="text/css" id="sprout-header-css">

        </style>
        <?php
    }
endif; // sprout_header_style