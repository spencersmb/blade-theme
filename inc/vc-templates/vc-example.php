<?php
// [bartag foo="foo-value"]
add_shortcode( 'bartag', 'bartag_func' );
function bartag_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'foo' => 'something',
        'icon_size' => '',
        'color' => '#FFF'
    ), $atts ) );

    $content = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content

    return "<div style='color:{$color};' data-foo='${foo}'>{$icon_size}{$content}</div>";
}

add_action( 'vc_before_init', 'your_name_integrateWithVC' );
function your_name_integrateWithVC() {
    vc_map( array(
        "name" => esc_html__( "Bar tag test", "my-text-domain" ),
        "base" => "bartag",
        "class" => "",
        "category" => esc_html__( "Content", "my-text-domain"),
        'admin_enqueue_js' => array(get_template_directory_uri().'/vc_extend/bartag.js'),
        'admin_enqueue_css' => array(get_template_directory_uri().'/vc_extend/bartag.css'),
        "params" => array(
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
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Text", "my-text-domain" ),
                "param_name" => "foo",
                "value" => __( "Default param value", "my-text-domain" ),
                "description" => __( "Description for foo param.", "my-text-domain" )
            ),
            array(
                "type" => "colorpicker",
                "class" => "",
                "heading" => esc_html__( "Text color", "my-text-domain" ),
                "param_name" => "color",
                "value" => '#FF0000', //Default Red color
                "description" => esc_html__( "Choose text color", "my-text-domain" )
            ),
            array(
                "type" => "textarea_html",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Content", "my-text-domain" ),
                "param_name" => "content", // Important: Only one textarea_html param per content element allowed and it should have "content" as a "param_name"
                "value" => esc_html__( "<p>I am test text block. Click edit button to change this text.</p>", "my-text-domain" ),
                "description" => esc_html__( "Enter your content.", "my-text-domain" )
            )
        )
    ) );
}
