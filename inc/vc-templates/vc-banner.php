<?php

//vc_add_param("vc_row", array(
//    "type" => "dropdown",
//    "group" => "portalZINE Additions",
//    "class" => "",
//    "heading" => "Type",
//    "param_name" => "type",
//    "value" => array(
//        "In Container" => "in_container",
//        "Full Width Background" => "full_width_background",
//        "Full Width Content" => "full_width_content"
//    )
//));

// [banner]
vc_map(array(
    "name"			=> "BannerSpencer",
    "category"		=> 'Content',
    "description"	=> "Place Banner",
    "base"			=> "banner",
    "class"			=> "",
    "icon"			=> "banner",


    "params" 	=> array(

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Title",
            "param_name"	=> "title",
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Subtitle",
            "param_name"	=> "subtitle",
            "admin_label"	=> FALSE,
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "URL",
            "param_name"	=> "link_url",
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Title Color",
            "param_name"	=> "title_color",
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Subtitle Color",
            "param_name"	=> "subtitle_color",
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Inner Stroke Thickness",
            "param_name"	=> "inner_stroke",
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Inner Stroke Color",
            "param_name"	=> "inner_stroke_color",
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Background Color",
            "param_name"	=> "bg_color",
        ),

        array(
            "type"			=> "attach_image",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Background Image",
            "param_name"	=> "bg_image",
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Height",
            "param_name"	=> "height",
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Separator Padding",
            "param_name"	=> "sep_padding",
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Separator Color",
            "param_name"	=> "sep_color",
        ),

        array(
            "type"			=> "dropdown",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "With Bullet",
            "param_name"	=> "with_bullet",
            "value"			=> array(
                "Yes"			=> "yes",
                "No"			=> "no"
            ),
        ),

        array(
            "type"			=> "textfield",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Bullet Text",
            "param_name"	=> "bullet_text",
            "dependency" 	=> Array('element' => "with_bullet", 'value' => array('yes'))
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Bullet Background Color",
            "param_name"	=> "bullet_bg_color",
            "dependency" 	=> Array('element' => "with_bullet", 'value' => array('yes'))
        ),

        array(
            "type"			=> "colorpicker",
            "holder"		=> "div",
            "class" 		=> "hide_in_vc_editor",
            "admin_label" 	=> true,
            "heading"		=> "Bullet Text Color",
            "param_name"	=> "bullet_text_color",
            "dependency" 	=> Array('element' => "with_bullet", 'value' => array('yes'))
        ),
    )

));

// [banner]
function banner_simple_height($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'title' => 'Title',
        'subtitle' => 'Subtitle',
        'link_url' => '',
        'title_color' => '#fff',
        'subtitle_color' => '#fff',
        'inner_stroke' => '2px',
        'inner_stroke_color' => '#fff',
        'bg_color' => '#000',
        'bg_image' => '',
        'height' => 'auto',
        'sep_padding' => '5px',
        'sep_color' => '#fff',
        'with_bullet' => 'no',
        'bullet_text' => '',
        'bullet_bg_color' => '',
        'bullet_text_color' => ''
    ), $params));

    $banner_with_img = '';

    if (is_numeric($bg_image)) {
        $bg_image = wp_get_attachment_url($bg_image);
        $banner_with_img = 'banner_with_img';
    }

    $content = do_shortcode($content);

    $banner_simple_height = '
		<div class="shortcode_banner_simple_height '.$banner_with_img.'" onclick="location.href=\''.$link_url.'\';">
			<div class="shortcode_banner_simple_height_inner">
				<div class="shortcode_banner_simple_height_bkg" style="background-color:'.$bg_color.'; background-image:url('.$bg_image.')"></div>
			
				<div class="shortcode_banner_simple_height_inside" style="height:'.$height.'; border: '.$inner_stroke.' solid '.$inner_stroke_color.'">
					<div class="shortcode_banner_simple_height_content">
						<div><h3 style="color:'.$title_color.' !important">'.$title.'</h3></div>
						<div class="shortcode_banner_simple_height_sep" style="margin:'.$sep_padding.' auto; background-color:'.$sep_color.';"></div>
						<div><h4 style="color:'.$subtitle_color.' !important">'.$subtitle.'</h4></div>
					</div>
				</div>
			</div>';

    if ($with_bullet == 'yes') {
        $banner_simple_height .= '<div class="shortcode_banner_simple_height_bullet" style="background:'.$bullet_bg_color.'; color:'.$bullet_text_color.'"><span>'.$bullet_text.'</span></div>';
    }

    $banner_simple_height .= '</div>';

    return $banner_simple_height;
}

add_shortcode('banner', 'banner_simple_height');