<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Neat
 */

get_header(); ?>

	<div class="aa_wrap">
		<h2><?php esc_html__( 'Oops! That page can&rsquo;t be found.', 'neat' ); ?></h2>
		<p><?php esc_html__( 'It looks like nothing was found at this location.', 'neat' ); ?></p>

		<?php get_search_form(); ?>
	</div>

<?php get_footer(); ?>
