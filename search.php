<?php
/**
 * The template for displaying search results pages.
 *
 * @package Neat
 */

get_header();
$blog_layout = get_redux_options('main_blog_layout');
?>

<section class="search-container">
	<!-- hero ssection -->
	<div class="hero no-image m-header scene_element scene_element--fadein">

		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
			<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " class="divider-path"/>
		</svg>

		<div class="hero-background"></div>

		<div class="hero-wrapper">
			<div class="hero-content">
				<div class="hero-content-inner">
					<h2 class="page-title"><?php printf( __( 'Search Results for: %s', 'neat' ), '<span>' . esc_html( get_search_query() ) . '</span>' ); ?></h2>

					<div class="hero-meta">

					</div>

				</div>
			</div>
		</div>
		<!-- end hero wrapper -->
	</div>
	<!-- end hero section -->
	<div class="container">
		<div class="row">
			<div class="col-xs-12 <?php if($blog_layout === "1"): echo esc_attr('col-md-8 col-lg-9'); ?><?php endif; ?>">

				<div class="content m-page scene_element scene_element--fadeinup">

					<?php if ( have_posts() ) : ?>

						<?php while ( have_posts() ) : the_post(); ?>

							<?php get_template_part( 'assets/views/content', 'search' ); ?>

						<?php endwhile; ?>

						<?php the_posts_navigation(); ?>

					<?php else : ?>

						<?php get_template_part( 'assets/views/content', 'none' ); ?>

					<?php endif; ?>
				</div>

			</div>
			<!-- /.col -->
			<?php if($blog_layout === "1"): ?>
				<div class="col-xs-12 col-md-4 col-lg-3">
					<?php get_sidebar(); ?>
				</div>
			<?php endif; ?>
		</div>
		<!-- /.row -->
	</div>
	<!-- /.et-primary-container -->
</section>
<!-- /.et-search -->

<?php get_footer(); ?>
