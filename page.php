<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Sprout
 */

get_header();
$page_layout = get_redux_options('main_page_layout'); ?>


<?php if($page_layout === "2"): ?>
	<main class="container">
<?php else: ?>
	<main class="container-fluid">
<?php endif; ?>

		<div class="row">

			<!-- page.php -->
			<div class="sprout-page-wrapper">

				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'assets/views/content', 'page' ); ?>

					<?php

					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;
					?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- /.sprout-page-wrapper -->

		</div><!-- /.row -->
		
</main><!-- /.container-fluid -->

<?php get_footer(); ?>
