<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Neat
 */
$page_layout = get_redux_options('main_page_layout');
?>
<?php if (is_front_page()): ?>

	<?php the_content(); ?>

<?php else: ?>
<article class="et_page">

	<div class="inner-page-wrapper">

		<?php the_content(); ?>
		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'neat' ),
			'after'  => '</div>',
		) );
		?>

	</div>
	<!-- /.et-page-wrapper -->

</article>
<!-- /.article -->

<?php endif; ?>

