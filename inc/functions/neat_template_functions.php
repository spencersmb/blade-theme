<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Neat
 */

if ( ! function_exists( 'neat_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 *
 * @since Underscores.me 1.0
 */
function neat_posted_on() {
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
		esc_html_x( ' on %s', 'post date', 'neat' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		esc_html_x( 'By %s', 'post author', 'neat' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

	echo '<span class="posted-on">' . $byline . '</span><span class="byline"> ' . $posted_on . '</span>'; // WPCS: XSS OK.

}
endif;


/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function neat_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'neat_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'neat_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so neat_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so neat_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in neat_categorized_blog.
 */
function neat_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'neat_categories' );
}
add_action( 'edit_category', 'neat_category_transient_flusher' );
add_action( 'save_post',     'neat_category_transient_flusher' );


/**
 * Custom template tags for this theme.
 *
 *
 */

if ( ! function_exists( 'neat_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function neat_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'neat' ) );
			if ( $categories_list && neat_categorized_blog() ) {
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'neat' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html__( ', ', 'neat' ) );
			if ( $tags_list ) {
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'neat' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link( esc_html__( 'Leave a comment', 'neat' ), esc_html__( '1 Comment', 'neat' ), esc_html__( '% Comments', 'neat' ) );
			echo '</span>';
		}

		edit_post_link( esc_html__( 'Edit', 'neat' ), '<span class="edit-link">', '</span>' );
	}
endif;

/**
 * Returns thumbnail for the post.
 *
 *
 */
function neat_post_thumbnail() {
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
function neat_comments($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment;

	?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID() ?>">

		<div class="user">

			<div class="author__img">
				<?php echo get_avatar($comment,$args['avatar_size']); ?>
			</div>

			<div class="comment__text">
				<span class="author"><?php echo get_comment_author_link(); ?></span>
				<span class="date"><?php printf(esc_html__('%1$s at %2$s', 'neat'), get_comment_date(),  get_comment_time()) ?></span>
				<?php if ($comment->comment_approved == '0') : ?>
					<em><i class="icon-info-sign"></i> <?php esc_html_e('Comment awaiting approval', 'neat'); ?></em>
					<br />
				<?php endif; ?>
				<?php comment_text(); ?>
				<span class="reply">
					<?php comment_reply_link(array_merge( $args, array('reply_text' => esc_html__('Reply', 'neat'), 'depth' => $depth, 'max_depth' => $args['max_depth'])), $comment->comment_ID); ?>
					<?php edit_comment_link(esc_html__('Edit', 'neat')); ?>
				</span>
			</div>

		</div>


	</li>

	<?php
}

//Custom Comments input rearranged fields
function neat_move_comment_field_to_bottom( $fields ) {
	$comment_field = $fields['comment'];
	unset( $fields['comment'] );
	$fields['comment'] = $comment_field;
	return $fields;
}
add_filter( 'comment_form_fields', 'neat_move_comment_field_to_bottom' );

// Replaces the excerpt "Read More" text by a link
function neat_excerpt_more($more) {
	global $post;
	return '<a class="moretag rounded-btn white-btn" href="'. get_permalink($post->ID) . '"> ' . esc_html__('Read more', 'neat'). '</a>';
}
add_filter('excerpt_more', 'neat_excerpt_more');

/*
 *
 * -------------------------------------------------------------------------------------
 * @Author: Smartik
 * @Author URI: http://smartik.ws/
 * @Copyright: (c) 2014 Smartik. All rights reserved
 * -------------------------------------------------------------------------------------
 *
 * @Date:   2014-06-20 03:40:47
 * @Last Modified by:   Smartik
 * @Last Modified time: 2014-06-23 22:46:40
 *
 */

################################################################################

/**
 * Theme View
 *
 * Include a file and(optionally) pass arguments to it.
 *
 * @param string $file The file path, relative to theme root
 * @param array $args The arguments to pass to this file. Optional.
 * Default empty array.
 *
 * @return object Use render() method to display the content.
 */
if ( ! class_exists('neat_ThemeView') ) {
	class neat_ThemeView{
		private $args;
		private $file;

		public function __get($name) {
			return $this->args[$name];
		}

		public function __construct($file, $args = array()) {
			$this->file = $file;
			$this->args = $args;
		}

		public function __isset($name){
			return isset( $this->args[$name] );
		}

		public function render() {
			if( locate_template($this->file) ){
				include( locate_template($this->file) );//Theme Check free. Child themes support.
			}
		}
	}
}

################################################################################

/**
 * neat Get Template Part
 *
 * An alternative to the native WP function `get_template_part`
 *
 * @see PHP class neat_ThemeView
 * @param string $file The file path, relative to theme root
 * @param array $args The arguments to pass to this file. Optional.
 * Default empty array.
 *
 * @return string The HTML from $file
 */
if( ! function_exists('neat_get_template_part') ){
	function neat_get_template_part($file, $args = array()){
		$template = new neat_ThemeView($file, $args);
		$template->render();
	}
}


