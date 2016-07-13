<?php
/**
 * Template part for displaying posts on index pages.
 *
 * @link https://codex.WordPress.org/Template_Hierarchy
 *
 * @package Neat
 */
$post_classes = array(
	'col-xs-12',
	'col-sm-6',
	'col-md-4',
	'post-thumb',
);

// if page is archive page and blog layout has side bar change to these classes
$blog_layout = get_redux_options('main_blog_layout');
$is_archive_page = is_archive();

if( $blog_layout === '1' && $is_archive_page ){
	$post_classes = array(
		'col-xs-12',
		'col-sm-6',
		'post-thumb',
	);
}

$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
$has_excerpt = has_excerpt();
?>

<article id="post-<?php the_ID(); ?>" class="<?php echo esc_attr(implode(' ', $post_classes)) ?>">
	<div class="post-thumb-img img-loader-bg" style="background-image: url(<?php echo esc_url($featured_image[0]); ?>)"></div>

	<?php if($has_excerpt):

			// determine excerpt length to add specific css size
			$excerpt_length = strlen($post->post_excerpt);
			$excerpt_css = "";
			if($excerpt_length < 118){
				$excerpt_css = "excerpt-sm";
			}
			if($excerpt_length >= 118 && $excerpt_length < 177){
				$excerpt_css = "excerpt-md";
			}
			if($excerpt_length > 177){
				$excerpt_css = "excerpt-lg";
			}

		?>

	<div class="post-thumb-content shadow-small-btn has-excerpt <?php echo esc_attr($excerpt_css) ?>">

	<?php else: ?>

		<div class="post-thumb-content shadow-small-btn">

	<?php endif; ?>

			<div class="post-thumb-header">

				<a class="post-thumb-link" href="<?php esc_url(the_permalink()); ?>"></a>
				<h1 class="post-thumb-title"><a href="<?php esc_url(the_permalink()); ?>"><?php the_title(); ?></a></h1>
				<button class="read-more rounded-btn white-btn btn-sm"><?php echo esc_html__('View Service', 'neat') ?></button>

					<?php if($has_excerpt): ?>
						<div class="post-thumb-excerpt">
							<?php the_excerpt(); ?>
						</div>
					<?php endif; ?>

			</div><!-- /.post-thumb-header -->

		</div>
		<!-- /.post-thumb-content -->

</article><!-- /article -->
