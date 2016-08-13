<?php
/**
 * The template part for displaying a message that posts cannot be found.
 *
 * @package Sprout
 */
?>

<section class="sprout-no-results">

	<?php esc_html__( 'Nothing Found', 'sprout' ); ?>

	<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

		<div class="single-headline">
			<h2><?php  echo esc_html__( 'Ready to publish your first post?', 'sprout')?> <a href="<?php esc_url( admin_url( 'post-new.php' ) ) ?>"><?php esc_html__('Get started here', 'sprout') ?></a></h2>
		</div>

	<?php elseif ( is_search() ) : ?>
		<div class="single-headline">
			<h2><?php echo esc_html__( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'sprout' ); ?></h2>
		</div>
		<div class="new-search">
			<div class="new-search-form">
				<?php get_search_form(); ?>
			</div>
		</div>

	<?php else : ?>
		<div class="single-headline">
			<h2><?php echo esc_html__( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'sprout' ); ?></h2>
		</div>
		<?php get_search_form(); ?>

	<?php endif; ?>


</section><!-- /.sprout-no-results -->
