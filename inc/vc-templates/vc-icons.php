<?php
// create icon field
add_shortcode_param('icon' , 'icon_field');

add_action( 'vc_before_init', 'neat_icon_select' );
function neat_icon_select(){
    vc_map(array(
        'name' => esc_html__( 'Icon Block', 'neat' ),
        'base' => 'icon_select',
        'class' => 'neat_icon_select',
        'icon' => 'icon-select',
        'category' => esc_html__( 'Content', 'neat' ),
        'description' => esc_html__( 'Select an Icon', 'neat' ),
        'params' => array(
            array(
                "type" 			=> "icon",
                "class" 		=> "hide_in_vc_editor",
                "admin_label" 	=> true,
                "heading" 		=> "Icon",
                "param_name" 	=> "fa_icon",
                "admin_label" 	=> false,
                "value" 		=> "fa-bookmark"
            ),
            array(
                "type" => "dropdown",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Icon Size", "neat"),
                "param_name" => "icon_size",
                "value" => array(
                    "Small" => "small",
                    "Medium" => "medium",
                    "Large" => "large",
                    "Large-XL" => "large-xl",
                    "Large-XXL" => "large-xxl",
                    "Large-XXXL" => "large-xxxl"
                )
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Icon Color", "neat"),
                "param_name" => "icon_color",
            ),
            array(
                "type" => "checkbox",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => esc_html__("Add Circle Border", "neat"),
                "param_name" => "border",
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Extra class name', 'neat' ),
                'param_name' => 'el_class',
                'description' => __( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'neat' ),
            )
        ),
    ));
}

// [icon_select]
function icon_select_shortcode($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'el_class' => '',
        'fa_icon' => '',
        'border' => 0,
        'icon_size' => 'small',
        'icon_color' => '#7ED321',
    ), $params));

    $fa_size = '';
    $circle = '';

    if($border) {
        $circle = 'circle';
    }

    $shortcode_args = array(
        'aside' => array(
            'id'=> array(),
            'style'=> array(),
            'class'=> array(),
        ),
        'h6'=> array(
            'style'=> array(),
            'class'=> array(),
        ),
        'div'=> array(
            'style'=> array(),
            'class'=> array(),
        ),
        'ul' => array(
            'id'=> array(),
            'style'=> array(),
            'class'=> array()
        ),
        'li' => array(
            'id'=> array(),
            'style'=> array(),
            'class'=> array()
        ),
        'img' => array(
            'alt'=> array(),
            'src'=> array(),
            'class'=> array()
        ),
        'h3' => array(
            'style'=> array(),
            'class'=> array()
        ),
        'p' => array(
            'style'=> array(),
            'class'=> array()
        ),
        'i' => array(
            'style'=> array(),
            'class'=> array()
        ),
        'a' => array(
            'href'=> array(),
            'style'=> array(),
            'class'=> array()
        )
    );

    /**
     * Icon Sizes
     *
     */
    switch ($icon_size) {
        case "small":
            $fa_size = '';
            break;
        case "medium":
            $fa_size = 'fa-lg';
            break;
        case "large":
            $fa_size = 'fa-2x';
            break;
        case "large-xl":
            $fa_size = 'fa-3x';
            break;
        case "large-xxl":
            $fa_size = 'fa-4x';
            break;
        case "large-xxxl":
            $fa_size = 'fa-5x';
            break;
    }

    /**
     * Shortcode attributes
     * @var $title
     * @var $el_class
     * @var $sidebar_id
     */
    $output = '
	<div 
	    class="icon-wrapper ' . esc_attr( $el_class ) . '' . esc_attr($circle).'"
	    style="color:'.esc_attr($icon_color).'"
	    ><i class="fa '. esc_attr($fa_icon) .' '. esc_attr($fa_size) .'"></i>';

	$output .= '</div>';

    return $output;
}
add_shortcode('icon_select', 'icon_select_shortcode');