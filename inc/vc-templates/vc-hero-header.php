<?php
add_action( 'vc_before_init', 'neat_hero_header' );
function neat_hero_header()
{

    vc_map(array(
        "name" => esc_html__("Hero Header", "neat"),
        "category" => esc_html__("Content", "neat"),
        "description" => esc_html__("Place Header", "neat"),
        "base" => "hero",
        "class" => "",
        "icon" => "icon-box",

        "params" => array(

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Title", "neat"),
                "param_name" => "title",
            ),

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Subtitle", "neat"),
                "param_name" => "subtitle",
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
                "heading" => esc_html__("Background Color", "neat"),
                "param_name" => "bg_color",
                "value" => "#7ED321"
            ),

            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Background Image",
                "param_name" => "bg_image",
            )
        )

    ));
}

// [hero]
function hero_header($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'title' => 'Title',
        'subtitle' => 'Subtitle',
        'title_color' => '#fff',
        'subtitle_color' => '#fff',
        'bg_color' => '#7ED321',
        'bg_image' => ''
    ), $params));

    $banner_with_img = '';

    if (is_numeric($bg_image)) {
        $bg_image = wp_get_attachment_url($bg_image);
        $banner_with_img = 'banner_with_img';
    }

//    $content = do_shortcode($content);

    $hero_header = '
    <!-- hero section -->
	<div class="hero m-header scene_element scene_element--fadein" style="background-color:'. esc_attr($bg_color) .'">

		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="65" viewBox="0 0 1212.4 64.6" class="divider-svg">
			<polygon points="606.2 40.9 0 0 0 64.6 595.2 64.6 617.2 64.6 1212.4 64.6 1212.4 0 " class="divider-path"/>
		</svg>

		<div class="hero-background" style="background-image:url('.esc_url($bg_image).')"></div>

		<div class="hero-wrapper">
			<div class="hero-content">
				<div class="hero-content-inner">
					<h2 class="hero-title" style="color:'.esc_attr($title_color).' !important">'.wp_kses($title, 'neat').'</h2>
					<h4 class="hero-subtitle" style="color:'.esc_attr($subtitle_color).' !important">'.wp_kses($subtitle, 'neat').'</h4>
				</div>
			</div>
		</div>
		<!-- end hero wrapper -->
		
	</div>
	<!-- end hero section -->
	';

    $hero_header .= '</div>';

    return $hero_header;
}

add_shortcode('hero', 'hero_header');

