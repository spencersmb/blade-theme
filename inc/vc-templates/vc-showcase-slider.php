<?php

function getPosts($services){

    // convert string ids to Num
    $string_services = explode(',', $services, 80);
    foreach ($string_services as $key => $value){
        $string_services[$key] = (int)($value);
    }

    //create loop args
    $args = array(
        'post_type' => 'service',
        'post__in' => $string_services,
        'order' => "ASC",
        'posts_per_page' => 10
    );


    // Get sticky posts
    $posts = get_posts( $args );

    return $posts;
}

function build_showcase_images($posts){
    $output = '';
    $postCount = 0;

    foreach ($posts as $post){

        $postId = get_post_thumbnail_id($post->ID);
        $featured_image = wp_get_attachment_image_url( $postId, 'neat-gallery-thumb-sm' );
        $thumb_image = wp_get_attachment_image_url($postId, 'thumbnail');

        $output .= '<li 
                        data-index="'. esc_attr($postCount) .'" 
                        data-thumb="'. esc_url($thumb_image) .'">
                            <img src="'. esc_url($featured_image) .'">
                        </li>';

        $postCount++;

    }

    return $output;
}

function build_showcase_desc($posts){
    $output ='';
    $postCount = 0;

    foreach ($posts as $post){

        $excerpt = get_the_excerpt($post->ID);
        $excerpt_trim = wp_trim_words( $excerpt , '17' );

        $output .= '
       
        <div class="showcase__desc--item" data-index="'. esc_attr($postCount) .'">
                        <h2>'. get_the_title($post->ID) .'</h2>
                        <p>'.wp_kses($excerpt_trim, 'neat').'</p>
                        <a href="'.esc_url(get_the_permalink($post->ID)).'" class="rounded-btn">'.esc_html__("View Project", 'neat').'</a>
                    </div>
                    <!-- end showcase__desc--item -->';

        $postCount++;

    }

    return $output;
}

// [showcase]
add_shortcode( 'showcase', 'neat_showcase_func' );
function neat_showcase_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'selected_services' => '',
        'bg_image' => '',
        'bg_color' => ''

    ), $atts ) );

    if (is_numeric($bg_image)) {
        $feature_bg_image = wp_get_attachment_url($bg_image);
        $temp_thumb_image = wp_get_attachment_url($bg_image, 'thumbnail');
    }

    $posts = getPosts($selected_services);

    // Build Output
    $output = '
    <div class="showcase">
    
        <div class="showcase__outer--bgimage" style="background-image: url('.esc_url($feature_bg_image).')">
        
            <div class="showcase__outer--bgcolor" style="background-color:'.esc_attr($bg_color).'">
            
                <div class="showcase__inner">
            
                    <div class="showcase__slider--content">
                        <div class="count">
                            <span class="current">'. esc_html__("1", "neat") .'</span> '. esc_html__("/", "neat") .' <span class="total"></span></span>
                        </div>
                        <div class="showcase__thumbs">
                            <div class="showcase__thumbs--inner">
                                <ul class="showcase__thumbs--images">
                                   
                                </ul>
                            </div>
                            <ul class="showcase__thumbsnav">
                                <li><a href="#" class="showcase__thumbsnav--prev"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
                                <li><a href="#" class="showcase__thumbsnav--next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                        <!-- end thumbs -->
                        
                        <div class="showcase__items--container">

                            <div class="showcase__item">
                            
                                <div class="showcase__slider--wrapper">
                                
                                    <ul class="showcase__slider--gallery">
                                    
                                    '.build_showcase_images($posts).'
                                    
                                    </ul>
                                    
                                    <ul class="showcase__nav">
                                        <li><a href="#" class="showcase__nav--prev">Prev</a></li>
                                        <li><a href="#" class="showcase__nav--next">Next</a></li>
                                    </ul>
                                    <!-- end showcase nav -->
                                    
                                </div>
                                <!-- end showcase__slider--wrapper -->
                                
                                <div class="showcase__desc">
                                
                                    '.build_showcase_desc($posts).'
                                    
                                </div>
                                <!-- end showcase__desc -->
                                
                            </div>
                            <!-- end showcase__item -->
                            
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
                'param_name'  => 'selected_services',
                'heading'     => esc_html__( 'Select Services', 'neat' ),
                'description' => esc_html__( 'Choose services to add to slider', 'neat' ),
                'type'        => 'checkbox',
                "value"			=> getAllPages('service')
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
};