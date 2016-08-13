<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Sprout
 */
$blog_layout = get_redux_options('main_blog_layout');
get_header(); ?>

	<main class="container-fluid no-padding">

		<?php if ( have_posts() ) : ?>

			<section>

				<!-- hero section -->
				<div class="hero m-header scene_element scene_element--fadein">

					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
						<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0" class="divider-path"/>
					</svg>
					<!-- end svg -->
					<div class="hero-background img-loader-bg delay-5" style="background-image:url('.esc_url($bg_image).')"></div>
					<!-- end background-image -->

					<div class="hero-wrapper">
						<div class="hero-content">
							<div class="hero-content-inner">
								<?php
								the_archive_title( '<h2 class="hero-title">', '</h2>' );
								the_archive_description( '<h4 class="hero-subtitle">', '</h4>' );
								?>

							</div>
							<!-- end hero-content-inner -->
						</div>
						<!-- end hero-content -->
					</div>
					<!-- end hero wrapper -->

				</div>
				<!-- end hero section -->

			</section>
			<!-- /header block -->

			<section class="container sprout-container-single">

				<div class="col-xs-12 m-page scene_element scene_element--fadeinup">

					<?php while ( have_posts() ) : the_post(); ?>

						<?php get_template_part( 'assets/views/content', get_post_format() ); ?>

					<?php endwhile; ?>

					<?php the_posts_navigation(); ?>

					<?php else : ?>

						<?php get_template_part( 'assets/views/content', 'none' ); ?>

					<?php endif; ?>

				</div>

			</section>

	</main>
	<!-- /main -->



<?php get_footer(); ?>
