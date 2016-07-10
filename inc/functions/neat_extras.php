<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package neat
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function neat_body_classes( $classes ) {
    // Adds a class of group-blog to blogs with more than 1 published author.
    if ( is_multi_author() ) {
        $classes[] = 'group-blog';
    }

    return $classes;
}
add_filter( 'body_class', 'neat_body_classes' );

//Sanitize Text
function neat_sanitize_text($text){
    return sanitize_text_field( $text );
}

function neat_sanitize_myEmail($email) {
    return sanitize_email( $email );
}

function neat_sanitize_boolean_value( $value ) {
    return (bool) $value;
}

function neat_get_product_ids( $object, $name ){
    $arr = array();

    //loop through each object and get the id
    foreach ( $object as $value ){
        array_push( $arr, $value[$name] );
    }
    return $arr;
}

// new excerpt function
function neat_new_excerpt_more($more) {
    //grab global variable
    global $post;

    //put 3 dots at the end + a tag + link of specific post
    return '</p><a class="moretag" href="'. esc_url(get_permalink($post->ID)) . '">'. esc_html__('continue reading', 'neat') .'</a></p>';
}

//CSS tricks function
function neat_get_the_content_by_id($post_id) {
    $page_data = get_post($post_id);
    if ($page_data) {
        return $page_data->post_content;
    }
    else return false;
}

//add this new function to the original function and it will replace the function with our new one
add_filter('excerpt_more', 'neat_new_excerpt_more');

function neat_custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'neat_custom_excerpt_length' );

//bootstrap embed video class
function neat_custom_oembed_filter($html, $url, $attr, $post_ID) {
    $return = '<div class="neat-video embed-responsive embed-responsive-16by9">'.$html.'</div>';
    return $return;
}
add_filter( 'embed_oembed_html', 'neat_custom_oembed_filter', 10, 4 ) ;

// Return redux params
function get_redux_options($param1, $param2 = null){

    global $neat_theme_options;

    if( $param2 != null ){
        return $neat_theme_options[$param1][$param2];
    }else{
        return $neat_theme_options[$param1];
    }

}

/**
 * Adds filter to pull in custom post types to the archive page.
 *
 * @param array WP Query object.
 * @return new WP Query Object
 */
function neat_add_custom_types( $query ) {
    if( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) {
        $query->set( 'post_type', array(
            'post', 'nav_menu_item', 'service', 'gallery'
        ));
        return $query;
    }
}
add_filter( 'pre_get_posts', 'neat_add_custom_types' );