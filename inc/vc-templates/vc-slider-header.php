<?php
function neat_build_header_cats($color){
    $output = '';
    if(!strlen($color) > 0){
        $color = '';
    }
    $post_id = get_the_ID();
    // build categories
    $get_categories = get_the_category($post_id);
    $cat_arr = array();

    foreach ($get_categories as $category){
        $temp = array();
        $temp['name'] = $category->name;
        $temp['url'] = get_category_link( $category->cat_ID );
        array_push($cat_arr, $temp);

        $output .= '<a class="tag-btn" style="color:'.esc_attr($color).'; border-color:'.esc_attr($color).'" href="'.get_category_link( $category->cat_ID ).'">'.$category->name.'</a>';
    }

    return $output;


}

function neat_build_image_list($image_ids){
    $output = '';
    $image_urls = array();
    $count = 0;
    $string_images = explode(',', $image_ids, 20);
    if ( count($string_images) > 0 ) {
        foreach ($string_images as $image){

            $image_srcset = wp_get_attachment_image_srcset( $image, 'neat-gallery-slider' );
            $image_src = wp_get_attachment_image( $image, 'neat-gallery-slider' );
            if($count === 0){
                $output .= '<li class="selected">
                    <img 
                        class="img-responsive" 
                        src="'.wp_get_attachment_url($image).'" 
                        srcset="'. esc_attr($image_srcset) .'"
                        sizes="(max-width: 1920px) 100vw, 1920px"
                        alt="">
                    
                    </li>';
            }else{
                $output .= '<li>
                    <img 
                        class="img-responsive" 
                        src="'.wp_get_attachment_url($image).'" 
                        srcset="'. esc_attr($image_srcset) .'"
                        sizes="(max-width: 1920px) 100vw, 1920px"
                        alt="">
                    
                    </li>';
            }
            $count++;
        }
    }

    return $output;
}

add_action( 'vc_before_init', 'neat_header_slider_func' );
function neat_header_slider_func() {
    vc_map( array(
        "name"      => esc_html__( "Header Slider", "neat" ),
        "base"      => "neat_header_slider",
        'icon'        => 'header_slider_icon',
        'description' => esc_html__( 'Create a Header Slider', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Subtext", "neat"),
                "param_name" => "subtext",
                "admin_label" => FALSE,
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Title Color", "neat"),
                "param_name" => "title_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Subtitle Color", "neat"),
                "param_name" => "subtitle_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Categories Color", "neat"),
                "param_name" => "cat_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Breadcrumbs Color", "neat"),
                "param_name" => "bread_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Divider Color", "neat"),
                "param_name" => "divider_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Layout Background Color", "neat"),
                "param_name" => "layout_bg_color",
                "value" => "#ededed"
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Background Color", "neat"),
                "param_name" => "bg_color",
                "value" => "#7ED321"
            ),
            array(
                "type" => "attach_images",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Slider Images",
                "description" => esc_html__( "Choose multiple images to add to the slider", "neat" ),
                "param_name" => "images",
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

function neat_header_slider_shortcode($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'title' => 'Title',
        'subtext' => '',
        'title_color' => '#fff',
        'subtitle_color' => '#fff',
        'cat_color' => '#fff',
        'bread_color' => '#fff',
        'divider_color' => '#fff',
        'layout_bg_color' => '#ededed',
        'bg_color' => '#7ED321',
        'images' => ''
    ), $params));

    $post_title='';

    $post_id = get_the_ID();
    // build categories
    $get_categories = get_the_category($post_id);
    $cat_arr = array();

    $neat_header_slider = '
    <!-- hero section -->
	<section class="header-slider-container no-padding" style="background-color:'. esc_attr($bg_color) .'">
        <div class="header-slider-inner">
            <div class="header-slider-content m-page scene_element scene_element--fadein" style="background-color:'. esc_attr($layout_bg_color) .'">
                <div class="header-slider-wrapper">
                
                    <ul class="header-slider-gallery">
                        '.neat_build_image_list($images).'
                    </ul>
                    
                    <ul class="header-slider-navigation">
                        <li><a href="#" class="slider-navigation-prev">Prev</a></li>
                        <li><a href="#" class="slider-navigation-next">Next</a></li>
                    </ul>
                    
                    <div class="count"><span class="current">1</span> / <span class="total"></span></span></div>
                    
                    <a href="#" class="et-close header-slider-close">Close</a>
                </div>
                <div class="header-slider-desc">
                    
                    <div class="header-slider-breadcrumb">
                        '.wp_kses_post(neat_breadcrumbs(array('color'=> $bread_color))).'
                    </div>
                    
                    <h2 style="color:'.esc_attr($title_color).'">' . get_the_title() . '</h2>
                    
                    <p style="color:'.esc_attr($subtitle_color).'">' . wp_kses($subtext, 'neat') . '</p>
                    
                </div>
                <div class="header-slider-meta">
                    '.wp_kses_post(neat_build_header_cats($cat_color), 'neat').'
                </div>
            </div>
        </div>
        <div class="m-page scene_element scene_element--fadeinup">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
                <polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " fill="'.esc_attr($divider_color).'" class="divider-path"/>
            </svg>
		</div>
	</section>
	<!-- end hero section -->
	';

    $neat_header_slider .= '</div>';

    return $neat_header_slider;
}

add_shortcode('neat_header_slider', 'neat_header_slider_shortcode');