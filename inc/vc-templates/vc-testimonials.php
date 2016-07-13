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
                'param_name'  => 'has_timer',
                'heading'     => esc_html__( 'Add Autoplay', 'neat' ),
                'description' => esc_html__( 'Check to add autoplay rotation to the slider', 'neat' ),
                'type'        => 'checkbox',
                "value"			=> ''
            ),
            array(
                'param_name'  => 'speed',
                'dependency' => array(
                    'element' => 'has_timer',
                    'value' => array('true')
                ),
                "heading" => esc_html__( "Cycle Speed", "neat" ),
                "description" => esc_html__( "Set the rotation speed. 1 sec = 1000. If you want a 6 sec delay type 6000 in the box", "neat" ),
                "type" => "textfield",
                "value" => '6000',
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
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__( "Quote Text Color", "neat" ),
                "param_name" => "quote_text_color",
                "class" => "hide_in_vc_editor",
                "value" => '#fff', //Default P color
                "description" => esc_html__( "Choose a text color.", "neat" )
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
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__( "Author text color", "neat" ),
                "param_name" => "author_text_color",
                "class" => "hide_in_vc_editor",
                "value" => '#222228', //Default P color
                "description" => esc_html__( "Choose a text color.", "neat" )
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

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_Testimonials extends WPBakeryShortCodesContainer {
        }
    }

};

// [testimonials]
add_shortcode( 'testimonials', 'neat_testimonials_shortcode' );
function neat_testimonials_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'speed' => '',
        'has_timer' => '',
        'class' => ''

    ), $atts ) );

    $content = do_shortcode($content);

    // Default Speed
    if($has_timer === 'true'){
        $speed = '6000';
    }else{
        $speed = 'false';
    }

    $output = '
    
        <div id="" class="testimonials carousel slide '. esc_attr($class) .'" data-ride="carousel" data-interval="'.esc_attr($speed).'">
         
          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
          
            '.$content.'
            
          </div>
        
          <!-- Controls -->
          <div class="control-wrapper">
              <div class="control-inner">
                  <a class="left carousel-control" href="#carousel-testimonial" role="button" data-slide="prev">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    <span class="sr-only">'.esc_html__('Previous', 'neat').'</span>
                  </a>
                  <a class="right carousel-control" href="#carousel-testimonial" role="button" data-slide="next">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <span class="sr-only">'.esc_html__('Next', 'neat').'</span>
                  </a>
              </div>
          </div>
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
        'overlay_color' => '',
        'quote_text_color' => '#fff',
        'author_text_color' => '#222228',
        'author' => ''

    ), $atts ) );

    // Default Color
    if($overlay_color === ''){
        $overlay_color = '#8ED72B';
    }

    // Image Check
    if (is_numeric($bg_image)) {
        $bg_image = wp_get_attachment_url($bg_image);
    }

    // Build Output
    $output = '
        <div class="item testimonial-item '. esc_attr($class) .'" style="background-image: url('. esc_url($bg_image). ');">
            
            <blockquote style="color:'. esc_attr($quote_text_color) .'">
                <q>'. wp_kses($quote, 'neat') .'</q>
                <cite style="color:'. esc_attr($author_text_color) .'">-'. wp_kses($author, 'neat') .'</cite>
            </blockquote>
            
            <div class="testimonial-color-block" style="background-color: '. esc_attr($overlay_color). ';"></div>
        </div>
    ';

    return $output;
}
