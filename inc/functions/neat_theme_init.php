<?php
/**
 * Custom initialization functions
 *
 * 
 *
 * @package Neat
 */


function neat_post_classes( $classes ) {
    $classes[] = 'loading';

    return $classes;
}
add_filter('body_class','neat_post_classes', 10, 1);

function neat_admin_class_checks(){
    global $wp_customize;
    $is_user_logged = is_user_logged_in();

    if($wp_customize !== null){
        return 'customizer-wp-header';
    }
    if($is_user_logged){
        return 'logged-in';
    }
}

function neat_get_global_query(){
    global $wp_query;

    return $wp_query;
}

function neat_filter_wp_title( $title, $sep ) {
    global $paged, $page;

    if ( is_feed() )
        return $title;

    // Add the site name.
    $title .= get_bloginfo( 'name' );

    // Add the site description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );

    if ( $site_description && ( is_home() || is_front_page() ) )
        $title = "$title $sep $site_description";

    return $title;
}
add_filter( 'wp_title', 'neat_filter_wp_title', 10, 2 );


function neat_update_blog_info()
{
    global $neat_theme_options;
    $check = array('blogdescription', 'blogname');
    foreach($check as $key)
    {
        if ( get_option($key)  != $neat_theme_options[$key] )
        {
            update_option( $key, $neat_theme_options[$key] );
        }
    }
}
add_action('init', 'neat_update_blog_info');

//check for VC plugin
if (class_exists('WPBakeryVisualComposerAbstract')) {

    add_action( 'vc_before_init', 'neat_vcSetAsTheme' );
    function neat_vcSetAsTheme() {

    // Add VC to custom post types
        if(function_exists('vc_set_default_editor_post_types')) vc_set_default_editor_post_types( array('post','page','service','gallery') );

        vc_manager()->disableUpdater(true);
        vc_set_as_theme();

    }

    //update cpt to init before visual composer
    // remove_action( 'init', 'neat_theme_register_my_cpts', 10 );
    // add_action( 'init', 'neat_theme_register_my_cpts', 1 );

}
