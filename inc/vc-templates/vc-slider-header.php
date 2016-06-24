<?php
add_action( 'vc_before_init', 'neat_header_slider_func' );
function neat_header_slider_func() {
    vc_map( array(
        "name"      => esc_html__( "Header Slider", "neat" ),
        "base"      => "neat_header_slider",
        'icon'        => 'text-output',
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

    $image_urls = array();
    $string_images = explode(',', $images, 20);
    if ( count($string_images) > 0 ) {
        foreach ($string_images as $image){
            array_push($image_urls, wp_get_attachment_url($image));
        }
    }

    $post_id = get_the_ID();
    // build categories
    $get_categories = get_the_category($post_id);
    $cat_arr = array();



    function build_header_cats($color){
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

    $neat_header_slider = '
    <!-- hero section -->
	<section class="header-slider-container no-padding m-header scene_element scene_element--fadein" style="background-color:'. esc_attr($bg_color) .'">
        <div class="container no-padding header-slider-inner" style="background-color:'. esc_attr($layout_bg_color) .'">
            <div class="header-slider-wrapper">
                <ul class="header-slider-gallery">
                    <li class="selected">
                        <img src="'. esc_url($image_urls[0]) .'" alt="">
                    </li>
                </ul>
            </div>
            <div class="header-slider-desc">
                
                <div class="header-slider-breadcrumb">
                    '.wp_kses_post(neat_breadcrumbs(array('color'=> $bread_color))).'
                </div>
                
                <h2 style="color:'.esc_attr($title_color).'">' . get_the_title() . '</h2>
                
                <p style="color:'.esc_attr($subtitle_color).'">' . wp_kses($subtext, 'neat') . '</p>
                
            </div>
            <div class="header-slider-meta">
                '.wp_kses_post(build_header_cats($cat_color), 'neat').'
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
			<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " fill="'.esc_attr($divider_color).'" class="divider-path"/>
		</svg>
	</section>
	<!-- end hero section -->
	';

    $neat_header_slider .= '</div>';

    return $neat_header_slider;
}

add_shortcode('neat_header_slider', 'neat_header_slider_shortcode');