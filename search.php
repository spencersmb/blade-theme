<?php
/**
 * The template for displaying search results pages.
 *
 * @package Sprout
 */

get_header();
$blog_layout = get_redux_options('main_blog_layout');
?>

<section class="search-container">
	
	<!-- hero section -->
	<div class="hero no-image m-header scene_element scene_element--fadein">

		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
			<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " class="divider-path"/>
		</svg>

		<div class="hero-background"></div>

		<div class="hero-wrapper">
			<div class="hero-content">
				<div class="hero-content-inner">
					<h2 class="page-title"><?php printf( __( 'Search Results for: %s', 'sprout' ), '<span>' . esc_html( get_search_query() ) . '</span>' ); ?></h2>

				</div><!-- /.hero-content-inner -->
				
			</div><!-- /.hero-content -->
			
		</div><!-- /.hero wrapper -->
		
	</div><!-- /.hero section -->
	
	<div class="container sprout-container-primary">
		<div class="row">
			<div class="col-xs-12">

				<div class="content m-page scene_element scene_element--fadeinup">

					<?php if ( have_posts() ) : ?>

						<?php while ( have_posts() ) : the_post(); ?>

							<?php get_template_part( 'assets/views/content', 'search' ); ?>

						<?php endwhile; ?>

						<?php
						$post_html = array(
							'i' => array(
								'class' => array()
							)
						);
						$post_array = array(
							'prev_text' => wp_kses( __( '<i class="fa fa-angle-double-left"></i> Older posts', 'sprout' ), $post_html),
							'next_text' => wp_kses( __( 'Newer posts <i class="fa fa-angle-double-right"></i>', 'sprout' ), $post_html),
						);
						the_posts_navigation($post_array); ?>

					<?php else : ?>

						<?php get_template_part( 'assets/views/content', 'none' ); ?>

					<?php endif; ?>
				</div><!-- /.content -->

			</div><!-- /.col -->
			
		</div><!-- /.row -->
		
	</div><!-- /.sprout-primary-container -->
	
</section><!-- /.sprout-search -->

<?php get_footer(); ?>
