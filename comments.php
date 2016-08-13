<?php
/**
 * The template for displaying comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package Sprout
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments">
	<div class="comments-wrapper">
			<?php
			if ( comments_open() ) :
				echo '<div class="comments-header"><h4>';
				comments_number( esc_html__('No Comments','sprout'), esc_html__('1 Comment','sprout'), esc_html__('Comments','sprout') . '<span class="number">%</span>'  );
				echo '</h4></div>';
			endif;

			echo "<div class='comments-content'>";

			wp_list_comments(array(
				'avatar_size'	=> 50,
				'max_depth'		=> 5,
				'style'			=> 'ul',
				'callback'		=> 'sprout_comments',
				'type'			=> 'all'
			));

			echo "</div>";

			echo "<div id='comments-pagination'>";
			paginate_comments_links(array('prev_text' => '&laquo;', 'next_text' => '&raquo;'));
			echo "</div>";

			$commenter = wp_get_current_commenter();
			$req = get_option( 'require_name_email' );
			$aria_req = ( $req ? " aria-required='true'" : '' );

			$new_fields = array(

				'author' =>
					'<div class="comment-form-input col-xs-12 col-md-6">
        <div class="comment-input-container">
    <span class="icon"><i class="fa fa-user"></i></span>
    <input id="author" class="user-name" name="author" type="text" required placeholder="Name" value="' . esc_attr( $commenter['comment_author'] ) .
					'" '. $aria_req . '></div></div>',

				'email' =>
					'<div class="comment-form-input col-xs-12 col-md-6">
        <div class="comment-input-container">
    <span class="icon"><i class="fa fa-envelope"></i></span>
    <input id="email" class="user-email" name="email" type="text" required placeholder="Email" value="' . esc_attr(  $commenter['comment_author_email'] ) .
					'" ' . $aria_req . ' /></div></div>',
			);

			$custom_comment_field = '
    <div class="col-xs-12 comment-textarea-container"><span class="icon"><i class="fa fa-pencil "></i></span>
    <textarea id="comment" class="user-text" name="comment" cols="45" rows="8" required placeholder="Message"></textarea>
    </div>';  //label removed for cleaner layout

			comment_form(array(
				'fields' => apply_filters( 'comment_form_default_fields', $new_fields ),
				'comment_field'			=> $custom_comment_field,
				'comment_notes_after'	=> '',
				'logged_in_as' 			=> '',
				'comment_notes_before' 	=> '',
				'title_reply'			=> esc_html__('Leave a Comment', 'sprout'),
				'cancel_reply_link'		=> esc_html__('Cancel Comment', 'sprout'),
				'label_submit'			=> esc_html__('Post Comment', 'sprout')
			));
			?>


	</div>
	<!-- end comments wrapper -->
</div>
<!-- end comments -->
