<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Neat
 */

get_header(); ?>

	<main class="container-fluid no-padding">

		<section>

			<!-- hero section -->
			<div class="hero m-header scene_element scene_element--fadein">

				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
					<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0" class="divider-path"/>
				</svg>
				<!-- end svg -->
				<div class="hero-background img-loader-bg delay-5" style="background-image:url()"></div>
				<!-- end background-image -->

				<div class="hero-wrapper">
					<div class="hero-content">
						<div class="hero-content-inner">
							<img class="img-responsive"
								src="<?php echo esc_url( get_stylesheet_directory_uri() ) ?>/assets/images/error_404.png"
								alt="error">
							<h2 class="hero-title"><?php echo esc_html__( 'Cut it out!', 'neat' ); ?></h2>
							<h3 class="hero-subtitle"><?php echo esc_html__( 'You&rsquo;ve reached a 404 page.', 'neat' ); ?></h3>

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

		<section class="container neat-container-single">

			<div class="col-xs-12 m-page scene_element scene_element--fadeinup">
				<div class="search-page">
					<h4><?php echo esc_html__( 'It looks like nothing was found at this location. Maybe try search...', 'neat' ); ?></h4>
					<?php get_search_form(); ?>
				</div>

			</div>

		</section>

	</main>
	<!-- /main -->

<?php get_footer(); ?>
