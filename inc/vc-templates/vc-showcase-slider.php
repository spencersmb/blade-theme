<?php

// [showcase_item]
add_shortcode( 'showcase_item', 'showcase_item_func' );
function showcase_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'showcase_thumb_text' => '',
        'service_id' => '',
        'class' => '',

    ), $atts ) );

    $args = array(
        'post_type' => 'service',
        'post__in' => array($service_id)
    );

    $the_query = new WP_Query($args);

    while ( $the_query->have_posts() ) {
        $the_query->the_post();

        //Build vars
        $postId = get_post_thumbnail_id();
        $featured_image = wp_get_attachment_image_url( $postId, 'neat-blog-thumb' );
        $thumb_image = wp_get_attachment_image_url( $postId, 'thumbnail' );
        $excerpt = get_the_excerpt();
        $excerpt_trim = wp_trim_words( $excerpt , '25' );
        $img_alt = get_post_meta( $postId, '_wp_attachment_image_alt', 'true');

        // Build Output
        $output = '
        <div class="showcase__item '. esc_attr($class) .' ">';

            $output .= '
            <div class="showcase__slider__image">
                <img src="'.esc_url($featured_image).'" alt="'.esc_attr($img_alt).'" data-thumb="'.esc_url($thumb_image).'">
            </div>
            <!-- end showcase__slider__image -->
            
            <div class="showcase__desc">
                <span class="cats">
                    <a href="">tag1</a>
                </span>
                <h2>Modern Garden Revival</h2>
                <p>Watering your lawn and is the key to preserving its lushness and healthy lawn. Compacted soils reduce drainage, increase runoff</p>
                <a href="" class="btn">View Project</a>
            </div>
            <!-- end showcase__desc -->
            
        </div>
        <!-- end showcase__item -->
        ';

    }

    return $output;
}

// [showcase]
add_shortcode( 'showcase', 'neat_showcase_func' );
function neat_showcase_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'bg_image' => '',
        'bg_color' => ''

    ), $atts ) );

    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="showcase">
    
        <div class="showcase__outer--bgimage" style="background-image: url()">
        
            <div class="showcase__outer--bgcolor" style="background-color:">
            
                <div class="showcase__inner">
            
                    <div class="showcase__slider">
                    
                        <div class="showcase__thumbs">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                        <!-- end thumbs -->
                        
                        <div class="showcase__items--container">
                            '.$content.'
                        </div>
                        <!-- end all showcase items container -->
                        
                        <div class="showcase__nav">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                        <!-- end showcase nav -->
                
                    </div>
                    <!-- end showcase slider -->
                    
                </div>
                <!-- end showcase inner -->
                
            </div>
            <!-- end showcase outer--bgcolor -->
            
        </div>
        <!-- end showcase outer--bgimage --> 
        
    </div>
    <!-- end showcase --> 
    ';

    return $output;
}

add_action( 'vc_before_init', 'neat_showcase_vc_func' );
function neat_showcase_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Showcase Slider", "neat" ),
        "base"      => "showcase",
        'icon'        => 'showcase_icon',
        "as_parent" => array('only' => 'showcase_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Create a showcase slider', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Background color", "neat" ),
                "param_name" => "bg_color",
                "value" => '#8ED72B',
                "description" => esc_html__( "Choose a transparent color for the background", "neat" )
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Main Background Image",
                "description" => esc_html__( "Choose a background image", "neat" ),
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
    vc_map( array(
        "name"      => esc_html__( "Showcase Item", "neat" ),
        "base"      => "showcase_item",
        'icon'        => 'showcase_item_icon',
        "as_child" => array('only' => 'showcase'),
        'description' => esc_html__( 'Add an item to the showcase slider.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Thumbnail title", "neat" ),
                "param_name" => "showcase_thumb_text",
                "value" => '',
                "description" => esc_html__( "Add a thumbnail title, keep it short and sweet.", "neat" )
            ),
            array(
                "type" => "dropdown",
                "class" => "",
                "heading" => esc_html__( "Select Service", "neat" ),
                "param_name" => "service_id",
                "value" => getAllPages('service'),
                "description" => esc_html__( "Select a service", "neat" )
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
        class WPBakeryShortCode_Showcase extends WPBakeryShortCodesContainer {
        }
    }
};