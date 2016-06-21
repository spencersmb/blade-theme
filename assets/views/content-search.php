<?php
/**
 * The template part for displaying results in search pages.
 *
 * @package Neat
 */
?>

<article class="blog-article">

	<div class="article">

		<h2 class="article-title">
			<a href="<?php esc_url(the_permalink()); ?>">

				<?php the_title(); ?>

			</a>
		</h2>
		<?php if ( 'post' == get_post_type() ) : ?>
			<span class="entry-date"><?php echo get_the_date(); ?></span>
		<?php endif; ?>

		<div class="article-content">

			<?php the_excerpt(); ?>

		</div>
	</div>
		<!-- /.aa_article__excerpt -->

</article>
<!-- /.aa_search -->
