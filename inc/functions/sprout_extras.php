<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Sprout
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function sprout_body_classes( $classes ) {
    // Adds a class of group-blog to blogs with more than 1 published author.
    if ( is_multi_author() ) {
        $classes[] = 'group-blog';
    }

    return $classes;
}
add_filter( 'body_class', 'sprout_body_classes' );

//Sanitize Text
function sprout_sanitize_text($text){
    return sanitize_text_field( $text );
}

function sprout_sanitize_myEmail($email) {
    return sanitize_email( $email );
}

function sprout_sanitize_boolean_value( $value ) {
    return (bool) $value;
}

function sprout_get_product_ids( $object, $name ){
    $arr = array();

    //loop through each object and get the id
    foreach ( $object as $value ){
        array_push( $arr, $value[$name] );
    }
    return $arr;
}

function sprout_get_postTags_string($postId){
    //Get tags
    $get_tags = get_the_tags($postId); //$tag_name[0]->name
    $tags_arr = array();
    $tags = '';

    //safety check for empty tag value
    if( $get_tags != "" ){
        foreach($get_tags as $tag){
            $tags_arr[] = $tag->name;
        }

        $tags = join(', ', $tags_arr );

    }

    return $tags;

}

//CSS tricks function
function sprout_get_the_content_by_id($post_id) {
    $page_data = get_post($post_id);
    if ($page_data) {
        return $page_data->post_content;
    }
    else return false;
}

function sprout_custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'sprout_custom_excerpt_length' );

//bootstrap embed video class
function sprout_custom_oembed_filter($html, $url, $attr, $post_ID) {
    $html_embed = str_replace('frameborder="0"', "", $html);
    $return = '<div class="sprout-video embed-responsive embed-responsive-16by9">'.$html_embed.'</div>';
    return $return;
}
add_filter( 'embed_oembed_html', 'sprout_custom_oembed_filter', 10, 4 ) ;

// Return redux params
function get_redux_options($param1, $param2 = null){

    global $sprout_theme_options;

    if( $param2 != null ){
        return $sprout_theme_options[$param1][$param2];
    }else{
        return $sprout_theme_options[$param1];
    }
}

/**
 * Adds filter to pull in custom post types to the archive page.
 *
 * @param array WP Query object.
 * @return new WP Query Object
 */
function sprout_add_custom_types( $query ) {
    if( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) {
        $query->set( 'post_type', array(
            'post', 'nav_menu_item', 'service', 'gallery'
        ));
        return $query;
    }
}
add_filter( 'pre_get_posts', 'sprout_add_custom_types' );