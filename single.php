<?php
/**
 * The template for displaying all single posts.
 *
 * @package Neat
 */
$blog_layout = get_redux_options('main_blog_layout');
get_header(); ?>

		<main class="container-fluid no-padding">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php

				$css_array = array(
					'neat-single'
				);

				// Setup Images
				$thumbnail_id = get_post_thumbnail_id( $post->ID );
				$thumbnail_url = wp_get_attachment_url( $thumbnail_id, 'large' );
				$thumbnail_url = wp_get_attachment_image_url( $thumbnail_id, 'large' );
				$thumbnail_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', 'true');
				$date = get_the_date('F j, Y');

//				echo "<pre>";
//				var_export(get_intermediate_image_sizes());
//				echo "</pre>";

				?>

			<!-- hero section if no image select correct header-->
			<?php if(strlen($thumbnail_url) > 0): ?>
				<div class="hero m-header scene_element scene_element--fadein">
			<?php else: ?>
				<div class="hero no-image m-header scene_element scene_element--fadein">
			<?php endif; ?>


					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
						<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " class="divider-path"/>
					</svg>
					
					<?php if(strlen($thumbnail_url) > 0): ?>
						<div class="hero-background img-loader-bg" style="background-image: url(<?php echo esc_url($thumbnail_url);?>)"></div>
					<?php else: ?>
						<div class="hero-background img-loader-bg"></div>
					<?php endif; ?>

					<div class="hero-wrapper">
						<div class="hero-content">
							<div class="hero-content-inner">
								<h2 class="hero-title"><?php the_title(); ?></h2>

								<div class="hero-meta">
									<?php
										// META CONTENT
										$comments_count = wp_count_comments( $post->ID );
										$total_comments = $comments_count->total_comments;
									?>
									<span class="post-time"><i class="fa fa-clock-o fa-lg"></i><?php echo wp_kses($date, 'neat') ?></span>
									<?php if($total_comments > 0 ): ?>
										<span class="post-comments-count"><i class="fa fa-comments-o fa-lg"></i><?php echo wp_kses($total_comments, 'neat'); ?> Comments</span>
									<?php endif; ?>
								</div>

							</div>
						</div>
					</div>
					<!-- end hero wrapper -->
				</div>
				<!-- end hero section -->

				<div class="container neat-container-single">

					<?php if($blog_layout === "1"): ?>
						<div class="col-xs-12 col-md-8 col-lg-9 m-page scene_element scene_element--fadeinup">
					<?php else: ?>
						<div class="col-xs-12 m-page scene_element scene_element--fadeinup">
					<?php endif; ?>


						<article id="post-<?php the_ID(); ?>" <?php post_class($css_array); ?> >
						<?php get_template_part( 'assets/views/content', 'single' ); ?>

						<?php neat_the_post_navigation(); ?>

						<?php
						// If comments are open or we have at least one comment, load up the comment template
						if ( comments_open() || get_comments_number() ) :
							comments_template();
						endif;
						?>
						</article><!-- /.post -->
					</div><!-- /content -->

					<?php if($blog_layout === "1"): ?>
						<div class="col-xs-12 col-md-4 col-lg-3">
							<?php get_sidebar(); ?>
						</div><!-- /sidebar - container -->
					<?php endif; ?>

				</div><!-- /.neat-container-single -->

				<?php endwhile; // end of the loop. ?>

	</main><!-- /.container-fluid -->

<?php get_footer(); ?>
