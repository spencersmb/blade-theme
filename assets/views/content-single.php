<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.WordPress.org/Template_Hierarchy
 *
 * @package Sprout
 */


?>

<div class="sprout-single__content">

	<?php the_content(); ?>
	
	<?php
	wp_link_pages( array(
		'before' => '<div class="et-pagelinks">' . esc_html__( 'Pages:', 'sprout' ),
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

	/*
	 * GET CATEGORIES
	 */
	$cat_name = get_the_category(); //$cat_name[0]->name

	$cat_output ='';

	?>

	<?php

	if( !empty($cat_name) || $get_tags != ""){

		$output .= '
			<!-- Tags -->
			<div class="sprout-single__tags">';


		/*
		 * echo out cats
		 */
		//safety check for empty cat value
		if( !empty($cat_name) ){

			$output .= '
			<!-- Tags -->
			<h6 class="uppercase bold">'.esc_html__('Categories:', 'sprout').'</h6>
				';

			foreach($cat_name as $cat){
				$cat_id = $cat->cat_ID;
				$cat_link = get_category_link( $cat_id );;
				$output .= '<a class="tag-btn" href="'. esc_url($cat_link) .'">'. wp_kses($cat->name, 'sprout') .'</a>';
			}

		} // end cat if


		/*
		 * echo out Tags
		 */
		//safety check for empty tag value
		if( $get_tags != "" ){

			$output .='
			<h6 class="uppercase bold">'.esc_html__('Tags:', 'sprout').'</h6>
			';

			foreach($get_tags as $tag){
				$tag_id = $tag->term_taxonomy_id;
				$tag_link = get_tag_link( $tag_id );
				$output .= '<a class="tag-btn" href="'. esc_url($tag_link) .'">'. wp_kses($tag->name, 'sprout') .'</a>';
			}

		} // end TAG if


		$output .= '
			</div>
			<!-- end tags -->
		';

		echo $output;

	}// end if container for cats and tags

	?>


	<?php
	/*
	 * SOCIAL SHARING
	 */
	$blog_title = get_the_title();
	$title_urlencode = rawurlencode($blog_title);
	?>

	<div class="sprout-single-social">
		<div class="col-xs-12">
			<div class="sprout-single-social__container">

				<h6><?php echo esc_html__('Share', 'sprout') ?></h6>

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

			</div><!-- /.container -->
			
		</div><!-- /.col-12 -->
		
	</div><!-- /.social -->

</div><!-- /.sprout-single__content -->


