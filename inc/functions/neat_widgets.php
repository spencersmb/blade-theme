<?php
/**
 *
 * Widgets
 *
 * @since  1.0.0
 *
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) { die; }


/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function neat_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'neat' ),
		'id'            => 'neat_sidebar_1',
		'description'   => 'General sidebar used in the blog',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );
	register_sidebar( array(
		'name'          => esc_html__( 'Footer', 'neat' ),
		'id'            => 'neat_footer',
		'description'   => 'Sidebar used in the footer',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );
	register_sidebar( array(
		'name'          => esc_html__( 'Service Sidebar', 'neat' ),
		'id'            => 'neat_service_bar',
		'description'   => 'Sidebar designed specifically for service pages',
		'before_widget' => '<aside id="%1$s" class="service-widget widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );
	register_sidebar( array(
		'name'          => esc_html__( 'Page Sidebar', 'neat' ),
		'id'            => 'neat_page_sidebar',
		'description'   => 'Small sidebar used inside static pages',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );
}
add_action( 'widgets_init', 'neat_widgets_init' );

function neat_footer_col_count($params) {

	$sidebar_id = $params[0]['id'];

	if ( $sidebar_id == 'neat_footer' ) {

		$total_widgets = wp_get_sidebars_widgets();
		$sidebar_widgets = count($total_widgets[$sidebar_id]);

		if($sidebar_widgets === 1){
			$colCount = floor(12 / $sidebar_widgets);
			$params[0]['before_widget'] = str_replace('class="', 'class="col-xs-12' . esc_attr($colCount) . ' ', $params[0]['before_widget']);
		}
		if($sidebar_widgets === 2){
			$colCount = floor(12 / $sidebar_widgets);
			$params[0]['before_widget'] = str_replace('class="', 'class="col-xs-12 col-sm-' . esc_attr($colCount) . ' ', $params[0]['before_widget']);
		}
		if($sidebar_widgets === 3){
			$colCount = floor(12 / $sidebar_widgets);
			$params[0]['before_widget'] = str_replace('class="', 'class="col-xs-12 col-md-' . esc_attr($colCount) . ' ', $params[0]['before_widget']);
		}
		if($sidebar_widgets === 4){
			$colCount = floor(12 / $sidebar_widgets);
			$params[0]['before_widget'] = str_replace('class="', 'class="col-xs-12 col-sm-6 col-md-' . esc_attr($colCount) . ' ', $params[0]['before_widget']);
		}
	}

	return $params;
}
add_filter('dynamic_sidebar_params','neat_footer_col_count');