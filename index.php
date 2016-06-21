<?php
/**
 * The blog index page.
 *
 * @package Neat
 */

get_header();

?>
	<?php
	$blog_layout = get_redux_options('main_blog_layout');
	$current_page = max(1, get_query_var('paged'));
	?>

	<div class="container et-container-primary">
		<div class="row">
			<div class="col-xs-12 <?php if($blog_layout === "1"): echo esc_attr('col-md-8 col-lg-9'); ?><?php endif; ?>">

				<div class="content m-page scene_element scene_element--fadeinup">
					<?php $count = 0; ?>
					<?php if ( have_posts() ) :  while ( have_posts() ) : the_post(); ?>
						<?php $count++ ?>
						<?php //get_template_part( 'assets/views/content' ) ?>

						<?php
						/**
						 * Template part for displaying posts on index pages.
						 *
						 * @link https://codex.WordPress.org/Template_Hierarchy
						 *
						 * @package Neat
						 */


						$cat = false;
						$cat_name = get_the_category(); //$cat_name[0]->name
						if( !empty($cat_name) ){
							$cat = true;
							$cat_id = $cat_name[0]->cat_ID;
							$cat_link = get_category_link( $cat_id );
						}

						$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large');

						?>
						<?php if($count === 1 && $current_page === 1):
							$post_classes = array(
							'post-thumb',
							'blog-article',
							'primary',
							'col-xs-12'
							);
						elseif($current_page === 1):
							$post_classes = array(
								'post-thumb',
								'blog-article-p1',
								'col-xs-12',
								'col-sm-6'
							);
						else:
							$post_classes = array(
								'post-thumb',
								'blog-article',
								'col-xs-12',
								'col-sm-6'
							);
						endif; ?>

							<article
								id="post-<?php the_ID(); ?>"
								class="<?php echo implode(' ', $post_classes) ?>"
								<?php if($count === 1 && $current_page === 1): ?>
									<?php if( strlen($featured_image[0]) > 0 ): ?>
								style="background-image: url(<?php echo esc_url($featured_image[0]) ?>);"
									<?php endif; ?>
								<?php endif; ?>
							>
								<div class="article-wrapper">
									<div class="article-image">
										<?php
										$postId = get_post_thumbnail_id();
										$img_src = wp_get_attachment_image_url( $postId, 'neat-blog-thumb' );
										$img_srcset = wp_get_attachment_image_srcset( $postId, 'neat-blog-thumb' );
										$img_alt = get_post_meta( $postId, '_wp_attachment_image_alt', 'true');
										?>
										<?php if(strlen($img_src) > 0): ?>
										<a href="<?php esc_url(the_permalink()); ?>">

											<img src="<?php echo esc_url( $img_src ); ?>"
												 srcset="<?php echo esc_attr( $img_srcset ); ?>"
												 sizes="(max-width: 652px) 100vw, 652px" alt="<?php echo esc_attr($img_alt); ?>">

										</a>
										<?php endif; ?>


									</div>
									<div class="article">
										<?php if($count === 1 && $current_page === 1): ?>
											<span class="article-latest">LATEST NEWS</span>
										<?php endif; ?>
										<h2 class="article-title">
											<a href="<?php esc_url(the_permalink()); ?>">

												<?php the_title(); ?>

											</a>
										</h2>
										<span class="entry-date"><?php echo get_the_date(); ?></span>
										<div class="article-content">

											<?php the_excerpt(); ?>
											<?php
											//paginated links inside post
											wp_link_pages( array(
												'before' => '<div class="aa_pagelinks">' . esc_html__( 'Pages:', 'neat' ),
												'after'  => '</div>',
											) );
											?>

										</div>
									</div>
								</div>
								<!-- /article-content -->

							</article>
							<!-- /end articles -->

					<?php endwhile; ?>

						<div class="col-xs-12">
							<?php the_posts_navigation(); ?>
						</div>

					<?php else : ?>

						<?php get_template_part( 'assets/views/content', 'none' ); ?>

					<?php endif; ?>
				</div>

			</div>
			<?php if($blog_layout === "1"): ?>
				<div class="col-xs-12 col-md-4 col-lg-3">
					<?php get_sidebar(); ?>
				</div>
			<?php endif; ?>
		</div>
	</div>

	<!-- /.aa_wrap -->


<?php get_footer(); ?>
