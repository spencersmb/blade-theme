<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Neat
 */

get_header();
$page_layout = get_redux_options('main_page_layout');

//Check page for front page static
if (is_front_page()):?>
	<?php
		$show_slider = get_redux_options('slider_show');
	?>

	<?php if($show_slider): ?>
		<div class="section container-fluid no-padding ">
			<article class="content tp-banner-container">

				<?php putRevSlider('front-page-slider', 'homepage'); ?>

			</article>
		</div>
	<?php endif; ?>

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'assets/views/content', 'page' ); ?>

		<?php
		// If comments are open or we have at least one comment, load up the comment template
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
		?>

	<?php endwhile; // end of the loop. ?>


	<?php

//else this is a regular page
else: ?>

<main class="container-fluid">

	<section>
		<div class="row">

			<!-- user chooses block layout - needs to be moved inside page-content layout -->
			<div class="et-page-wrapper">

				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'assets/views/content', 'page' ); ?>

					<?php

					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;
					?>

				<?php endwhile; // end of the loop. ?>

			</div>
			<!-- /.et-page-wrapper -->


		</div>
		<!-- /.row -->
	</section>

</main>
<!-- /.container-fluid -->

<?php endif; //end check for front page?>

<?php get_footer(); ?>
