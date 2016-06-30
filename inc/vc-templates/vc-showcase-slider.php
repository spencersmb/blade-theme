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

    $the_query1 = new WP_Query($args);

    // Build Output
    $output = '
        <div class="showcase__item '. esc_attr($class) .' ">
            <div class="showcase__slider--wrapper">
                <ul class="showcase__slider--gallery">
        ';

    // First loop to build images
    while ( $the_query1->have_posts() ) {
        $the_query1->the_post();

        //Build vars
        $postIndex = $the_query1->current_post;
        $postId = get_post_thumbnail_id();
        $featured_image = wp_get_attachment_image_url($postId, 'neat-blog-thumb');
        $thumb_image = wp_get_attachment_image_url($postId, 'thumbnail');
        $img_alt = get_post_meta($postId, '_wp_attachment_image_alt', 'true');

        if( $postIndex === 0 ){
            $output .= '
                <li class="selected">
                    <img data-index="'. esc_attr($postIndex) .'" src="' . esc_url($featured_image) . '" alt="' . esc_attr($img_alt) . '" data-thumb="' . esc_url($thumb_image) . '">
                </li>
            ';
        }else {
            $output .= '
                <li>
                    <img data-index="'. esc_attr($postIndex) .'" src="' . esc_url($featured_image) . '" alt="' . esc_attr($img_alt) . '" data-thumb="' . esc_url($thumb_image) . '">
                </li>
            ';
        }
    }

    // Close up image container
    $output.= '
            </ul>
            <ul class="showcase__nav">
                <li><a href="#" class="showcase__nav--prev">Prev</a></li>
                <li><a href="#" class="showcase__nav--next">Next</a></li>
            </ul>
            <!-- end showcase nav -->
            
        </div>
        <!-- end showcase__slider__wrapper -->
    ';

    wp_reset_postdata();
    // END FIRST LOOP

    //Wrapper for desc items
    $output .= '<div class="showcase__desc">';

    $the_query2 = new WP_Query($args);

    // 2nd loop to build desc
    while ( $the_query2->have_posts() ) {

        $the_query2->the_post();

        // Build vars
        $postIndex2 = $the_query2->current_post;
        $excerpt = get_the_excerpt();
        $excerpt_trim = wp_trim_words($excerpt, '15');

        $has_categories = has_category();
        $categories = get_the_category(get_the_ID());

        $output .= '
        <div class="showcase__desc--item selected" data-index="'. esc_attr($postIndex2) .'">';

        if ($has_categories) {
            $output .= '<span class="cats">';

            foreach ($categories as $category) {
                $output .= '<a href="' . esc_url(get_category_link($category->cat_ID)) . '">' . wp_kses($category->name, 'neat') . '</a>';
            }

            $output .= '</span>';

        }

        $output .= '<h2>' . get_the_title() . '</h2>
                <p>' . wp_kses($excerpt_trim, 'neat') . '</p>
                <a href="' . esc_url(get_the_permalink()) . '" class="rounded-btn">' . esc_html__('View Project', 'neat') . '</a>
            </div>
            <!-- end showcase__desc -->
        ';
    }
    //END SECOND LOOP

    $output .= '    
        </div>
        <!-- end showcase__desc -->
    </div>
    <!-- end showcase__item -->
    ';

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

    if (is_numeric($bg_image)) {
        $feature_bg_image = wp_get_attachment_url($bg_image);
        $temp_thumb_image = wp_get_attachment_url($bg_image, 'thumbnail');
    }

    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="showcase">
    
        <div class="showcase__outer--bgimage" style="background-image: url('.esc_url($feature_bg_image).')">
        
            <div class="showcase__outer--bgcolor" style="background-color:'.esc_attr($bg_color).'">
            
                <div class="showcase__inner">
            
                    <div class="showcase__slider--content">
                    
                        <div class="showcase__thumbs">
                            <div class="showcase__thumbs--inner">
                                <ul class="showcase__thumbs--images">
                                    <li><a href="#"><img src="//localhost:3000/wp-content/uploads/2016/06/touchit-150x150.jpg"><span>Patio</span></a></li>
                                    <li class="selected"><a href="#"><img src="//localhost:3000/wp-content/uploads/2016/06/touchit-150x150.jpg"><span>Patio</span></a></li>
                                    <li><a href="#"><img src="//localhost:3000/wp-content/uploads/2016/06/touchit-150x150.jpg"><span>Patio</span></a></li>
                                </ul>
                            </div>
                            <ul class="showcase__thumbsnav">
                                <li><a href="#" class="showcase__thumbsnav--prev"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
                                <li><a href="#" class="showcase__thumbsnav--next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                        <!-- end thumbs -->
                        
                        <div class="showcase__items--container">
                        
                            '.$content.'

                        </div>
                        <!-- end all showcase items container -->
                
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