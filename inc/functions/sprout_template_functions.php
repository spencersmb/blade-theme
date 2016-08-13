<?php
/**
 * Custom template functions for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Sprout
 */

if ( ! function_exists( 'sprout_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 *
 * @since Underscores.me 1.0
 */
function sprout_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date('l, F jS, Y') ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( ' on %s', 'post date', 'sprout' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		esc_html_x( 'By %s', 'post author', 'sprout' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

	echo '<span class="posted-on">' . $byline . '</span><span class="byline"> ' . $posted_on . '</span>'; // WPCS: XSS OK.

}
endif;

/**
 * Returns all pages.
 *
 * @return assoc array: postID -> postName
 */
function sprout_get_all_pages_reverse($type){

	$args = array(
		'posts_per_page'  => -1,
		'post_type' => $type,
		'orderby'=> 'title',
		'order'=>'ASC'
	);

	// return assoc array with Name and post ID
	global $post;

	$listings = new WP_Query($args);

	$page_array = array();

	$string_names = '';

	while ( $listings->have_posts() ) {
		$listings->the_post();

		$page_title = html_entity_decode(get_the_title($post->ID));
		$page_array[$post->ID] = $page_title;
	}


	return $page_array;
}

/**
 * Returns all pages.
 *
 * @return assoc array: postID -> postName
 */
function sprout_getAllDHVC_forms(){

	$args = array(
		'post_type'=>'dhvcform',
		'posts_per_page'=> -1,
		'post_status'=>'publish',
	);
	$form = new WP_Query($args);

	// return assoc array with Name and post ID
	global $post;

	$page_array = array();

	while ( $form->have_posts() ) {
		$form->the_post();
		$page_title = html_entity_decode(get_the_title($post->ID));
		$page_array[$page_title] = $post->ID;
	}

	wp_reset_postdata();
	return $page_array;
}

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function sprout_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'sprout_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'sprout_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so sprout_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so sprout_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in sprout_categorized_blog.
 */
function sprout_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'sprout_categories' );
}
add_action( 'edit_category', 'sprout_category_transient_flusher' );
add_action( 'save_post',     'sprout_category_transient_flusher' );


/**
 * Custom template tags for this theme.
 *
 *
 */

if ( ! function_exists( 'sprout_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function sprout_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'sprout' ) );
			if ( $categories_list && sprout_categorized_blog() ) {
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'sprout' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html__( ', ', 'sprout' ) );
			if ( $tags_list ) {
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'sprout' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link( esc_html__( 'Leave a comment', 'sprout' ), esc_html__( '1 Comment', 'sprout' ), esc_html__( '% Comments', 'sprout' ) );
			echo '</span>';
		}

		edit_post_link( esc_html__( 'Edit', 'sprout' ), '<span class="edit-link">', '</span>' );
	}
endif;

/**
 * Returns thumbnail for the post.
 *
 *
 */
function sprout_post_thumbnail() {
	if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
		return;
	}

	if ( is_singular() ) :
		?>

		<div class="post-thumbnail">
			<?php the_post_thumbnail(); ?>
		</div><!-- .post-thumbnail -->

	<?php else : ?>

		<a class="post-thumbnail" href="<?php esc_url(the_permalink()); ?>" aria-hidden="true">
			<?php the_post_thumbnail( 'post-thumbnail', array( 'alt' => the_title_attribute( 'echo=0' ) ) ); ?>
		</a>

	<?php endif; // End is_singular()
}

/**
 * Comment functions for theme.
 *
 *
 */

//Custom Comments layout called from comments.php
function sprout_comments($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment;

	?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID() ?>">

		<div class="user">

			<div class="author__img">
				<?php echo get_avatar($comment,$args['avatar_size']); ?>
			</div>

			<div class="comment__text">
				<span class="author"><?php echo get_comment_author_link(); ?></span>
				<span class="date"><?php printf(esc_html__('%1$s at %2$s', 'sprout'), get_comment_date(),  get_comment_time()) ?></span>
				<?php if ($comment->comment_approved == '0') : ?>
					<em><i class="icon-info-sign"></i> <?php esc_html_e('Comment awaiting approval', 'sprout'); ?></em>
					<br />
				<?php endif; ?>
				<?php comment_text(); ?>
				<span class="reply">
					<?php comment_reply_link(array_merge( $args, array('reply_text' => esc_html__('Reply', 'sprout'), 'depth' => $depth, 'max_depth' => $args['max_depth'])), $comment->comment_ID); ?>
					<?php edit_comment_link(esc_html__('Edit', 'sprout')); ?>
				</span>
			</div>

		</div>


	</li>

	<?php
}

//Custom Comments input rearranged fields
function sprout_move_comment_field_to_bottom( $fields ) {
	$comment_field = $fields['comment'];
	unset( $fields['comment'] );
	$fields['comment'] = $comment_field;
	return $fields;
}
add_filter( 'comment_form_fields', 'sprout_move_comment_field_to_bottom' );

// Replaces the excerpt "Read More" text by a link
function sprout_excerpt_more($more) {
	global $post;
	return '<a class="moretag rounded-btn" href="'. get_permalink($post->ID) . '"> ' . esc_html__('Read more', 'sprout'). '</a>';
}
add_filter('excerpt_more', 'sprout_excerpt_more');

function sprout_excerpt($content) {
	global $post;
	$post_content = get_post($post->ID)->post_excerpt;
	return $post_content;
}
add_filter('the_excerpt', 'sprout_excerpt');

/**
 * Add Categories to pages. Then add pages to the search results of categories
 *
 *
 */
function sprout_add_taxonomies_to_pages() {
	register_taxonomy_for_object_type( 'category', 'page' );
}
add_action( 'init', 'sprout_add_taxonomies_to_pages' );
if ( ! is_admin() ) {
	add_action( 'pre_get_posts', 'sprout_category_and_tag_archives' );

}
function sprout_category_and_tag_archives( $wp_query ) {
	$my_post_array = array('post','page');

	if ( $wp_query->get( 'category_name' ) || $wp_query->get( 'cat' ) )
		$wp_query->set( 'post_type', $my_post_array );

	if ( $wp_query->get( 'tag' ) )
		$wp_query->set( 'post_type', $my_post_array );
}

add_action( 'init', 'sprout_add_excerpts_to_pages' );
function sprout_add_excerpts_to_pages() {
	add_post_type_support( 'page', 'excerpt' );
}

/**
 * Custom Navigation output for blog
 *
 *
 */
function sprout_get_the_post_navigation( $args = array() ) {
	$args = wp_parse_args( $args, array(
		'prev_text'          => '%title',
		'next_text'          => '%title',
		'featured_image'          => '%image',
		'in_same_term'       => false,
		'excluded_terms'     => '',
		'taxonomy'           => 'category',
		'screen_reader_text' => esc_html__( 'Post navigation', 'sprout' ),
	) );

	$navigation = '';


	$previous = sprout_get_previous_post_link(

		'<div class="nav-previous">
			%link
		</div>
		',
		$args['prev_text'],
		$args['in_same_term'],
		$args['excluded_terms'],
		$args['taxonomy']
	);

//	echo "<pre>";
//	print_r($previous);
//	echo "</pre>";

	// check to push the next link all the way to the right
	if ($previous === '') {
		$next = sprout_get_next_post_link(
			'<div class="nav-next no-prev">
				%link
			</div>',
			$args['next_text'],
			$args['in_same_term'],
			$args['excluded_terms'],
			$args['taxonomy']
		);
	} else {
		$next = sprout_get_next_post_link(
			'<div class="nav-next">
				%link
			</div>',
			$args['next_text'],
			$args['in_same_term'],
			$args['excluded_terms'],
			$args['taxonomy']
		);
	}



	// Only add markup if there's somewhere to navigate to.
	if ( $previous || $next ) {
		$navigation = sprout_navigation_markup( $previous . $next, 'post-navigation', $args['screen_reader_text'] );
	}


	return $navigation;
}

function sprout_the_post_navigation( $args = array() ) {

	echo sprout_get_the_post_navigation( $args );
}

/**
 * Get next post link that is adjacent to the current post.
 *
 * @since 3.7.0
 *
 * @param string       $format         Optional. Link anchor format.
 * @param string       $link           Optional. Link permalink format.
 * @param bool         $in_same_term   Optional. Whether link should be in a same taxonomy term.
 * @param array|string $excluded_terms Optional. Array or comma-separated list of excluded term IDs.
 * @param string       $taxonomy       Optional. Taxonomy, if $in_same_term is true. Default 'category'.
 * @return string The link URL of the next post in relation to the current post.
 */
function sprout_get_next_post_link( $format = '%link &raquo;', $link = '%title', $in_same_term = false, $excluded_terms = '', $taxonomy = 'category' ) {
	return sprout_get_adjacent_post_link( $format, $link, $in_same_term, $excluded_terms, false, $taxonomy );
}
function sprout_get_previous_post_link( $format = '&laquo; %link', $link = '%title', $in_same_term = false, $excluded_terms = '', $taxonomy = 'category' ) {
	return sprout_get_adjacent_post_link( $format, $link, $in_same_term, $excluded_terms, true, $taxonomy );
}

/**
 * Get adjacent post link.
 *
 * Can be either next post link or previous.
 *
 * @since 3.7.0
 *
 * @param string       $format         Link anchor format.
 * @param string       $link           Link permalink format.
 * @param bool         $in_same_term   Optional. Whether link should be in a same taxonomy term.
 * @param array|string $excluded_terms Optional. Array or comma-separated list of excluded terms IDs.
 * @param bool         $previous       Optional. Whether to display link to previous or next post. Default true.
 * @param string       $taxonomy       Optional. Taxonomy, if $in_same_term is true. Default 'category'.
 * @return string The link URL of the previous or next post in relation to the current post.
 */
function sprout_get_adjacent_post_link( $format, $link, $in_same_term = false, $excluded_terms = '', $previous = true, $taxonomy = 'category' ) {
	if ( $previous && is_attachment() )
		$post = get_post( get_post()->post_parent );
	else
		$post = get_adjacent_post( $in_same_term, $excluded_terms, $previous, $taxonomy );

	if ( ! $post ) {
		$output = '';
	} else {
		$title = $post->post_title;

		if ( empty( $post->post_title ) )
			$title = $previous ? esc_html__( 'Previous Post', 'sprout' ) : esc_html__( 'Next Post', 'sprout' );

		/** This filter is documented in wp-includes/post-template.php */
		$title = apply_filters( 'the_title', $title, $post->ID );

		$date = mysql2date( get_option( 'date_format' ), $post->post_date );
		$rel = $previous ? 'prev' : 'next';

		$image_class = $previous ? 'img-prev' : 'img-next';
		$postId = $post->ID;
		$thumbnail_id = get_post_thumbnail_id( $postId );

		$featured_image = wp_get_attachment_image_url( $thumbnail_id, 'thumbnail' );
		$blank_image = get_template_directory_uri() . '/assets/images/blank.jpg';

		$string = '<span class="'. $image_class .'">
						<a href="'.get_the_permalink($postId).'">';
						if($featured_image !== false){
							$string .= '<img src="'. $featured_image .'" alt="">';
						} else {
							$string .= '<img src="'. $blank_image .'" alt="">';
						}

		$string .= '
						</a>
				   </span>';

		$string .= '<a href="' . get_permalink( $post ) . '" rel="'.$rel.'"><span class="text">';

		$inlink = str_replace( '%title', $title, $link );
		$inlink = str_replace( '%date', $date, $inlink );
		$inlink = $string . $inlink . '</span></a>';

		$output = str_replace( '%link', $inlink, $format );

	}

	$adjacent = $previous ? 'previous' : 'next';

	/**
	 * Filter the adjacent post link.
	 *
	 * The dynamic portion of the hook name, `$adjacent`, refers to the type
	 * of adjacency, 'next' or 'previous'.
	 *
	 * @since 2.6.0
	 * @since 4.2.0 Added the `$adjacent` parameter.
	 *
	 * @param string  $output   The adjacent post link.
	 * @param string  $format   Link anchor format.
	 * @param string  $link     Link permalink format.
	 * @param WP_Post $post     The adjacent post.
	 * @param string  $adjacent Whether the post is previous or next.
	 */
//	return $string;
	return apply_filters( "{$adjacent}_post_link", $output, $format, $link, $post, $adjacent );
}

/**
 * Wraps passed links in navigational markup.
 *
 * @since 4.1.0
 * @access private
 *
 * @param string $links              Navigational links.
 * @param string $class              Optional. Custom class for nav element. Default: 'posts-navigation'.
 * @param string $screen_reader_text Optional. Screen reader text for nav element. Default: 'Posts navigation'.
 * @return string Navigation template tag.
 */
function sprout_navigation_markup( $links, $class = 'posts-navigation', $screen_reader_text = '' ) {
	if ( empty( $screen_reader_text ) ) {
		$screen_reader_text = esc_html__( 'Posts navigation', 'sprout' );
	}

	$template = '
	<nav class="navigation %1$s">
		<h2 class="screen-reader-text">%2$s</h2>
		<div class="nav-links">%3$s</div>
	</nav>';

	/**
	 * Filter the navigation markup template.
	 *
	 * Note: The filtered template HTML must contain specifiers for the navigation
	 * class (%1$s), the screen-reader-text value (%2$s), and placement of the
	 * navigation links (%3$s):
	 *
	 *     <nav class="navigation %1$s" role="navigation">
	 *         <h2 class="screen-reader-text">%2$s</h2>
	 *         <div class="nav-links">%3$s</div>
	 *     </nav>
	 *
	 * @since 4.4.0
	 *
	 * @param string $template The default template.
	 * @param string $class    The class passed by the calling function.
	 * @return string Navigation template.
	 */
	$template = apply_filters( 'navigation_markup_template', $template, $class );

	return sprintf( $template, sanitize_html_class( $class ), esc_html( $screen_reader_text ), $links );
}


