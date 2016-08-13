<?php
/**
 * The template part for displaying results in search pages.
 *
 * @package Sprout
 */
?>

<article class="blog-article">

	<div class="article">
		
		<?php if ( 'post' == get_post_type() ) : ?>
			<span class="entry-date"><?php echo get_the_date(); ?></span>
		<?php endif; ?>
		<h2 class="article-title">
			<a href="<?php esc_url(the_permalink()); ?>">

				<?php the_title(); ?>

			</a>
		</h2>


		<div class="article-content">


			<span class="span-excerpt"><?php the_excerpt(); ?></span>

			<?php if(has_excerpt()): ?>
				<a class="moretag rounded-btn" href="<?php echo esc_url(the_permalink()) ?>"><?php echo esc_html__('Read More', 'sprout') ?></a>
			<?php endif; ?>


		</div><!-- /.article-content -->

	</div><!-- /.article -->

</article><!-- /.blog-article -->
