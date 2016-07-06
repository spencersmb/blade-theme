<?php

add_action( 'vc_before_init', 'neat_testimonials_vc_func' );
function neat_testimonials_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Testimonials Slider", "neat" ),
        "base"      => "testimonials",
        'icon'        => 'testimonials_icon',
        "as_parent" => array('only' => 'testimonials_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'List of feature testimonials posts.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__( "Overlay color", "neat" ),
                "param_name" => "overlay_color",
                "class" => "hide_in_vc_editor",
                "value" => '#8ED72B', //Default P color
                "description" => esc_html__( "Choose overlay fade color", "neat" )
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'neat' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'neat' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ) );
    vc_map( array(
        "name"      => esc_html__( "Testimonial Item", "neat" ),
        "base"      => "testimonials_item",
        'icon'        => 'testimonials_item_icon',
        "as_child" => array('only' => 'testimonials'),
        'description' => esc_html__( 'Add an item to the testimonial slider.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(
            array(
                "type" => "textarea",
                "holder" => "div",
                "heading" => esc_html__( "Quote", "neat" ),
                "param_name" => "quote",
                "class" => "hide_in_vc_editor",
                "value" => '',
                "description" => esc_html__( "Add a quote here.", "neat" )
            ),
            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Author Name", "neat" ),
                "param_name" => "author",
                "value" => '',
                "description" => esc_html__( "Add an author.", "neat" )
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Background Image",
                "param_name" => "bg_image",
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'neat' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'neat' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ) );

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_Testimonials extends WPBakeryShortCodesContainer {
        }
    }

};

// [testimonials]
add_shortcode( 'testimonials', 'neat_testimonials_shortcode' );
function neat_testimonials_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'overlay_color' => '',

    ), $atts ) );

    // Default Color
    if($overlay_color === ''){
        $overlay_color = '#8ED72B';
    }

    $content = do_shortcode($content);

    $output = '
    
        <div id="" class="testimonials carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-testimonial" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-testimonial" data-slide-to="1" ></li>
          </ol>
        
          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            
            '.$content.'
            
          </div>
        
          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-testimonial" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">'.esc_html__('Previous', 'neat').'</span>
          </a>
          <a class="right carousel-control" href="#carousel-testimonial" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">'.esc_html__('Next', 'neat').'</span>
          </a>
        </div>
    ';


    return $output;
}

add_shortcode( 'testimonials_item', 'neat_testimonials_item_func' );
function neat_testimonials_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'quote' => '',
        'bg_image' => '',
        'author' => ''

    ), $atts ) );

    // Build Output
    $output = '
        <div class="item">
            Item 1
          <div class="carousel-caption">
          </div>
        </div>
    ';

    return $output;
}
