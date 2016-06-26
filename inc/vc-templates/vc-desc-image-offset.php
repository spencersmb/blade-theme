<?php
// [desc_offset]
add_shortcode( 'desc_offset', 'desc_offset_func' );
function desc_offset_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'header_color' => '',
        'bg_color' => '',
        'image_1' => '',
        'image_2' => ''

    ), $atts ) );

    // Inner content
    $content = do_shortcode($content);

    // Image Check
    if (is_numeric($image_1)) {
        $image_1 = wp_get_attachment_url($image_1);
    }

    if (is_numeric($image_2)) {
        $image_2 = wp_get_attachment_url($image_2);
    }


    // Build Output
    $output = '
    <div class="desc-o-container">';
    
        if(strlen($image_1) > 0){
            $output .= '
                <div class="desc-o-image-1">
                    <img class="img-responsive" src="'.esc_url($image_1).'" alt="temp">
                </div>';
        }

        $output .= '
        <!--main container -->
        <div style="background-color:'. esc_attr($bg_color) .'" class="col-xs-12 col-sm-9 col-md-7 col-md-offset-1 col-lg-6 col-lg-offset-2 desc-o-inner">
            
            <div class="col-xs-12">
            
                <div class="desc-o-content">
                '.$content.'
                </div>
                
            </div>
                    
        </div>';

        if(strlen($image_2)){
            $output .= '
                    <div class="desc-o-image-2 col-xs-12 no-padding">
                        <img class="img-responsive" src="'.esc_url($image_2).'" alt="temp">
                    </div>';
        }
    $output .='
    </div>
    ';
                    

    $output .= '

    </div>
    <!-- end desc_offset container --> 
    ';

    return $output;
}

add_action( 'vc_before_init', 'desc_offset_vc_func' );
function desc_offset_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Description Image Offset", "neat" ),
        "base"      => "desc_offset",
        'icon'        => 'desc_offset_icon',
        "as_parent" => array('only' => 'vc_column_text'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Create a description + image offset', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Image 1",
                "description" => esc_html__( "Main image behind text.", "neat" ),
                "param_name" => "image_1",
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Image 2",
                "description" => esc_html__( "Smaller 2nd image below text.", "neat" ),
                "param_name" => "image_2",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Background color", "neat" ),
                "param_name" => "bg_color",
                "value" => '#7ED321', //Default White
                "description" => esc_html__( "Choose a background color", "neat" )
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
        class WPBakeryShortCode_Desc_Offset extends WPBakeryShortCodesContainer {
        }
    }
};