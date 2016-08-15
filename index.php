<?php
/**
 * The blog index page.
 *
 * @package Sprout
 */

get_header();

?>
	<?php
	$blog_layout = get_redux_options('main_blog_layout');
	$current_page = max(1, get_query_var('paged'));
	?>

	<main class="sprout-blocked-container">
		<div class="sprout-container-primary">
			<div class="row">
				<div class="col-xs-12 <?php if($blog_layout === "1"): echo esc_attr('col-md-9'); ?><?php endif; ?>">

					<div class="content m-page scene_element scene_element--fadeinup">
						<?php
						// setup to determine 10 or 9 + sticky
						$sticky_posts = get_option( 'sticky_posts' );
						$stick_post_count = count($sticky_posts);
						$post_count = 11;


						if($stick_post_count > 0){

							$post_count = 12 - $stick_post_count;

							if( $post_count <= 0 ){
								$post_count = 0;
							}

							$args = array(
								'posts_per_page' => $post_count,
								'paged' => $current_page
							);
						} else {
							$args = array(
								'posts_per_page' => $post_count,
								'paged' => $current_page
							);
						}

						$the_query = new WP_Query( $args );

						?>
						<?php $count = 0; ?>
						<?php if( have_posts()): while( $the_query->have_posts() ): $the_query->the_post();?>
							<?php $count++ ?>
							<?php
							/**
							 * Template part for displaying posts on index pages.
							 *
							 * @link https://codex.WordPress.org/Template_Hierarchy
							 *
							 * @package Sprout
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
										$img_src = wp_get_attachment_image_url( $postId, 'sprout-blog-thumb' );
										$img_srcset = wp_get_attachment_image_srcset( $postId, 'sprout-blog-thumb' );
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
											<span class="article-latest"><?php echo esc_html__('LATEST NEWS', 'sprout') ?></span>
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
											$more_html = '<span class="moretag rounded-btn">'.esc_html__('Read More', 'sprout').'</span>';
											$more_array_html = array(
												'a' => array(
													'href' => array(),
													'class' => array()
												),
												'span' => array(
													'class' => array()
												)
											);

											if(has_excerpt()):
												$excerpt = get_the_excerpt();
												$excerpt_trim = wp_trim_words( $excerpt , '25' );?>
												<p>
													<?php echo wp_kses($excerpt_trim, 'sprout'); ?>
													<a class="moretag rounded-btn" href="<?php echo esc_url(the_permalink()) ?>">
														<?php echo esc_html__('Read More', 'sprout') ?>
													</a>
												</p>
											<?php else: ?>
												<?php the_content( wp_kses( __( $more_html, 'sprout' ), $more_array_html) ); ?>
											<?php endif; ?>

											<?php
											//paginated links inside post
											wp_link_pages( array(
												'before' => '<div class="sprout_pagelinks">' . esc_html__( 'Pages:', 'sprout' ),
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
								<?php
								// make sure post count is greater than 11 for no sticky & & greater than 10 if there are sticky posts
								$published_posts = wp_count_posts();
								$published_posts_count = $published_posts->publish;
								$post_html = array(
									'i' => array(
										'class' => array()
									)
								);

								$post_array = array(
									'prev_text' => wp_kses( __( '<i class="fa fa-angle-double-left"></i> Older posts', 'sprout' ), $post_html),
									'next_text' => wp_kses( __( 'Newer posts <i class="fa fa-angle-double-right"></i>', 'sprout' ), $post_html),

								);

								?>
								<?php if( $published_posts_count > 11 && $stick_post_count == 0): ?>
									<?php the_posts_navigation($post_array); ?>
								<?php elseif ( $stick_post_count > 0 && $published_posts_count > 10): ?>
									<?php the_posts_navigation($post_array); ?>
								<?php endif; ?>
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
		</div>
	</main><!-- /main -->


<?php get_footer(); ?>
