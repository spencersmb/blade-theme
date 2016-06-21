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

    //Replace VC classes with bootstrap classes
//    add_filter('vc_shortcodes_css_class', function ($class_string, $tag) {
//        $tags_to_clean = [
//            'vc_row',
//            'vc_column',
//            'vc_row_inner',
//            'vc_column_inner'
//        ];
//        if (in_array($tag, $tags_to_clean)) {
//
//            $class_string = str_replace(' wpb_row', '', $class_string);
//            $class_string = str_replace(' vc_row-fluid', '', $class_string);
//            $class_string = str_replace(' vc_column_container', '', $class_string);
//            $class_string = str_replace('wpb_column', '', $class_string);
//
//            // replace vc_, but exclude any custom css
//            // attached via vc_custom_XXX (negative lookahead)
//            $class_string = preg_replace('/vc_(?!custom)/i', '', $class_string);
//
//            // replace all vc_
//            // $class_string = preg_replace('/vc_/i', '', $class_string);
//        }
//        $class_string = preg_replace('|col-sm|', 'col-sm', $class_string);
//        return $class_string;
//    }, 10, 2);

    //update cpt to init before visual composer
    // remove_action( 'init', 'neat_theme_register_my_cpts', 10 );
    // add_action( 'init', 'neat_theme_register_my_cpts', 1 );

}
