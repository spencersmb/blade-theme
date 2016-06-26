<?php
// [process]
add_shortcode( 'process', 'process_func' );
function process_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'header_color' => '',
        'text_color' => '',
        'image' => ''

    ), $atts ) );

    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="container">
        <div class="row">
          <div class="process-container" style="">
                    
                    '.$content;

    $output .= '
            </row>
            <!-- end process container --> 
       </div>
        <!-- end process container --> 
    </div>
    <!-- end container -->
    ';

    return $output;
}

// [process_item]
add_shortcode( 'process_item', 'process_item_func' );
function process_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'fa_icon' => '',
        'item_header_text' => '',
        'header_color' => '',
        'item_text' => '',
        'text_color' => '',
        'icon_color' => '',

    ), $atts ) );

    // Build Output
    $output = '
    <div class="col-xs-12 col-sm-4 process-item-container">
        <div class="process-item-inner '. esc_attr($class) .'">';

    $output .= '
            <div class="process-item-header">
                <h6 style="color: '.esc_attr($header_color).'"><span><i style="color: '.esc_attr($icon_color).'" class="fa '.esc_attr($fa_icon).'"></i></span>'. wp_kses($item_header_text, 'neat') .'</h6>
            </div>
            <div class="process-item-text">
                <p style="color: '.esc_attr($text_color).'">'. wp_kses($item_text, 'neat') .'</p>
            </div>
    ';

    $output .= '
        </div>
    </div>
    <!-- end process item container -->
    ';

    return $output;
}

add_action( 'vc_before_init', 'process_vc_func' );
function process_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Process Map", "neat" ),
        "base"      => "process",
        'icon'        => 'process_icon',
        "as_parent" => array('only' => 'process_item, vc_single_image'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Create a process Map. Add up to six items', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Center Image",
                "description" => esc_html__( "Choose a center image, must be square dimension.", "neat" ),
                "param_name" => "image",
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
        "name"      => esc_html__( "Process Item", "neat" ),
        "base"      => "process_item",
        'icon'        => 'process_item_icon',
        "as_child" => array('only' => 'process'),
        'description' => esc_html__( 'Add an item to the process Map.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Header", "neat" ),
                "param_name" => "item_header_text",
                "value" => '',
                "description" => esc_html__( "Add Header text.", "neat" )
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Header text color", "neat" ),
                "param_name" => "header_color",
                "value" => '#35373D', //Default White
                "description" => esc_html__( "Choose header text color", "neat" )
            ),
            array(
                "type" => "textarea",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Text", "neat" ),
                "param_name" => "item_text",
                "value" => '',
                "description" => esc_html__( "Add short description.", "neat" )
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Text color", "neat" ),
                "param_name" => "text_color",
                "value" => '#95989A', //Default P color
                "description" => esc_html__( "Choose text color", "neat" )
            ),
            array(
                "type" 			=> "icon",
                "class" 		=> "hide_in_vc_editor",
                "admin_label" 	=> true,
                "heading" 		=> "Icon",
                "param_name" 	=> "fa_icon",
                "admin_label" 	=> false,
                "value" 		=> "fa-wheelchair"
            ),
            array(
                "type" => "colorpicker",
                "class" => "",
                "heading" => esc_html__( "Icon color", "neat" ),
                "param_name" => "icon_color",
                "value" => '#95989A', //Default Red color
                "description" => esc_html__( "Choose text color", "neat" )
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
        class WPBakeryShortCode_Process extends WPBakeryShortCodesContainer {
        }
    }
};

