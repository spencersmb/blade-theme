<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Sprout
 */
?>
<!-- content-page.php -->
<div class="sprout_page">

	<div class="inner-page-wrapper">

		<?php the_content(); ?>
		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'sprout' ),
			'after'  => '</div>',
		) );
		?>

	</div><!-- /.inner-page-wrapper -->

</div><!-- /.sprout_page -->

