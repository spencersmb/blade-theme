<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.me/
 *
 * @package Sprout
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function sprout_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => 'sprout_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function sprout_jetpack_setup
add_action( 'after_setup_theme', 'sprout_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function sprout_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function sprout_infinite_scroll_render
