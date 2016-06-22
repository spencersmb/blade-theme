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

$cat = false;
$cat_name = get_the_category(); //$cat_name[0]->name
if( !empty($cat_name) ){
	$cat = true;
	$cat_id = $cat_name[0]->cat_ID;
	$cat_link = get_category_link( $cat_id );
}

$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
$has_excerpt = has_excerpt();
?>

<article id="post-<?php the_ID(); ?>" class="<?php echo implode(' ', $post_classes) ?>">
	<div class="post-thumb-img" style="background-image: url(<?php echo esc_url($featured_image[0]); ?>)"></div>

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

	<div class="post-thumb-content has-excerpt <?php echo esc_attr($excerpt_css) ?>">

	<?php else: ?>

		<div class="post-thumb-content">

	<?php endif; ?>

		<div class="post-thumb-header">

			<a class="post-thumb-link" href="<?php esc_url(the_permalink()); ?>"></a>
			<h1 class="post-thumb-title"><a href="<?php esc_url(the_permalink()); ?>"><?php the_title(); ?></a></h1>
			<button class="read-more rounded-btn white-btn btn-sm">View Service</button>

				<?php if($has_excerpt): ?>
					<div class="post-thumb-excerpt">
						<?php the_excerpt(); ?>
					</div>
				<?php endif; ?>

		</div>

	</div>
	<!-- /.aa_content__content -->

</article>
<!-- /.aa_content -->