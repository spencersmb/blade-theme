<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.WordPress.org/Template_Hierarchy
 *
 * @package Neat
 */


?>

<div class="et-single__content">

	<?php the_content(); ?>
	
	<?php
	wp_link_pages( array(
		'before' => '<div class="et-pagelinks">' . esc_html__( 'Pages:', 'neat' ),
		'after'  => '</div>',
	) );
	?>

	<?php
	/*
	 * GET TAGS
	 */
	$get_tags = get_the_tags(); //$tag_name[0]->name
	$tags_arr = array();
	$tags = '';
	$output ='';

	//safety check for empty tag value
	if( $get_tags != "" ){

		$output .= '
		<!-- Tags -->
		<div class="et-single__tags">
			';

		foreach($get_tags as $tag){
			$tag_id = $tag->term_taxonomy_id;
			$tag_link = get_tag_link( $tag_id );
			$output .= '<a class="tag-btn" href="'. esc_url($tag_link) .'">'. wp_kses($tag->name, 'neat') .'</a>';
		}

		$output .= '
		</div>
		<!-- end tags -->
		';
	}

	echo $output;

	?>

	<?php
	/*
	 * SOCIAL SHARING
	 */
	$blog_title = get_the_title();
	$title_urlencode = rawurlencode($blog_title);
	?>

	<div class="et-single-social">
		<div class="col-xs-12">
			<div class="et-single-social__container">

				<h6>Share</h6>

				<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php esc_url(the_permalink()); ?>">
					<i class="fa fa-facebook"></i>
				</a>

				<a target="_blank" href="https://pinterest.com/pin/create/button/?url=<?php esc_url(the_permalink()); ?>&media=<?php echo esc_url($thumbnail_url); ?>&description=<?php echo $title_urlencode; ?>">
					<i class="fa fa-pinterest"></i>
				</a>

				<a target="_blank" href="https://twitter.com/home?status=Check%20out%20this%20article:%20<?php echo $title_urlencode; ?>%20-%20<?php esc_url(the_permalink()); ?>">
					<i class="fa fa-twitter"></i>
				</a>

				<a target="_blank" href="//plus.google.com/share?url=<?php esc_url(the_permalink()); ?>">
					<i class="fa fa-google-plus"></i>
				</a>

			</div>
			<!-- end container -->
		</div>
		<!-- end col-12 -->
	</div>
	<!-- end social -->

</div>
<!-- /et-single__content -->


