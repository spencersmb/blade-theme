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

	<main class="neat-blocked-container">
		<section class="neat-container-primary">
			<div class="row">
				<div class="col-xs-12 <?php if($blog_layout === "1"): echo esc_attr('col-md-9'); ?><?php endif; ?>">

					<div class="content m-page scene_element scene_element--fadeinup">
						<?php $count = 0; ?>
						<?php if ( have_posts() ) :  while ( have_posts() ) : the_post(); ?>
							<?php $count++ ?>

							<?php
							/**
							 * Template part for displaying posts on index pages.
							 *
							 * @link https://codex.WordPress.org/Template_Hierarchy
							 *
							 * @package Neat
							 */

							$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large');

							?>

							<?php if($count === 1 && $current_page === 1):
								// Check if we are on the first page or not
								$post_classes = array(
									'post-thumb',
									'blog-article',
									'primary',
									'shadow-medium',
									'img-loader-bg',
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
								class="<?php echo esc_attr(implode(' ', $post_classes)); ?>"
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
											<span class="article-latest"><?php echo esc_html__('LATEST NEWS', 'neat') ?></span>
										<?php endif; ?>
										<h2 class="article-title">
											<a href="<?php esc_url(the_permalink()); ?>">

												<?php the_title(); ?>

											</a>
										</h2>
										<span class="entry-date"><?php echo get_the_date(); ?></span>
										<div class="article-content">
											<?php
											// Check to do custom excerpt length

											if(has_excerpt()):
												$excerpt = get_the_excerpt();
												$excerpt_trim = wp_trim_words( $excerpt , '25' );?>
												<p>
													<?php echo wp_kses($excerpt_trim, 'neat'); ?>
													<a class="moretag rounded-btn" href="<?php echo esc_url(the_permalink()) ?>">
														<?php echo esc_html__('Read More', 'neat') ?>
													</a>
												</p>
											<?php else: ?>
												<p><?php the_excerpt(); ?></p>
											<?php endif; ?>

											<?php
											//paginated links inside post
											wp_link_pages( array(
												'before' => '<div class="neat_pagelinks">' . esc_html__( 'Pages:', 'neat' ),
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
					<div class="col-xs-12 col-md-3">
						<?php get_sidebar(); ?>
					</div><!-- end sidebar -->
				<?php endif; ?>
			</div>
		</section>
	</main><!-- /main -->


<?php get_footer(); ?>
