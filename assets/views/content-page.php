<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Neat
 */
?>
<!-- content-page.php -->
<article class="et_page">

	<div class="inner-page-wrapper">

		<?php the_content(); ?>
		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'neat' ),
			'after'  => '</div>',
		) );
		?>

	</div><!-- /.inner-page-wrapper -->

</article><!-- /.et_page -->

