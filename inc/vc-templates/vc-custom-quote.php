<?php
// create icon field
add_shortcode_param('icon' , 'icon_field');
add_action( 'vc_before_init', 'neat_quote' );
function neat_quote()
{

    vc_map(array(
        "name" => esc_html__("Custom Quote", "neat"),
        "category" => esc_html__("Content", "neat"),
        "description" => esc_html__("Add a Quote module", "neat"),
        "as_parent" => array('only' => 'quote_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        "base" => "quote",
        "class" => "",
        "icon" => "quote_icon",

        "params" => array(

            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Header Text', 'neat' ),
                'description' => esc_html__( 'Enter header title text.', 'neat' ),
                "value" => 'Build your custom quote', //Default White
                "admin_label" => true,
                'param_name' => 'el_class',
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Header Text Color", "neat"),
                "value" => '#3A3B3D', //Default White
                "class" => "hide_in_vc_editor",
                "param_name" => "header_text_color",
            ),
            array(
                'type' => 'textarea',
                'heading' => esc_html__( 'Paragraph Text', 'neat' ),
                'description' => esc_html__( 'Enter text.', 'neat' ),
                "value" => 'The kit consists of more than a hundred ready-to-use elements that you can combine to get the exact prototype you want.', //Default White
                "admin_label" => false,
                'param_name' => 'text_content',
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Paragraph Text Color", "neat"),
                "value" => '#3A3B3D', //Default White
                "class" => "hide_in_vc_editor",
                "param_name" => "text_content_color",
            ),
            array(
                'type' => 'dropdown',
                'heading' => esc_html__( 'Contact page link', 'neat' ),
                'description' => esc_html__( 'Select a page link for contact.', 'neat' ),
                "admin_label" => true,
                'param_name' => 'custom_link',
                "value" => getAllPages('page')
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'neat' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'neat' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )

        )

    ));
    vc_map( array(
        "name"      => esc_html__( "Quote Item", "neat" ),
        "base"      => "quote_item",
        'icon'        => 'quote_item_icon',
        "as_child" => array('only' => 'quote'),
        "as_parent" => array('only' => 'quote_bullet'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Add an item to the Quote Builder.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Title', 'neat' ),
                'param_name' => 'title',
                "admin_label" => true,
                'description' => esc_html__( 'Add title.', 'neat' ),
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Title Color", "neat"),
                "class" => "hide_in_vc_editor",
                "value" => '#222228',
                "param_name" => "title_color",
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Cost', 'neat' ),
                'param_name' => 'cost',
                "admin_label" => true,
                'description' => esc_html__( 'Add a price.', 'neat' ),
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Short Description', 'neat' ),
                'param_name' => 'desc',
                "admin_label" => false,
                'description' => esc_html__( 'Add a short description of the plan.', 'neat' ),
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Description Text Color", "neat"),
                "value" => '#222228',
                "param_name" => "desc_color",
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Button Text', 'neat' ),
                'param_name' => 'button_text',
                "admin_label" => false,
                'description' => esc_html__( 'Add text for the button.', 'neat' ),
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Button Color", "neat"),
                "value" => '#7ED321',
                "param_name" => "button_color",
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
    vc_map(array(
        "name" => esc_html__("Item Bullet", "neat"),
        "category" => esc_html__("Content", "neat"),
        "as_child" => array('only' => 'quote_item'),
        "description" => esc_html__("Add a bullet item to the plan", "neat"),
        "base" => "quote_bullet",
        "class" => "",
        "icon" => "quote_bullet_icon",

        "params" => array(

            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Item Text', 'neat' ),
                'description' => esc_html__( 'Enter item text.', 'neat' ),
                "value" => '',
                "admin_label" => true,
                'param_name' => 'el_class',
            ),
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
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Icon Color", "neat"),
                "value" => '#3A3B3D',
                "class" => "hide_in_vc_editor",
                "param_name" => "header_text_color",
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'neat' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'neat' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )

        )

    ));

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_Quote extends WPBakeryShortCodesContainer {
        }
    }
    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_Quote_Item extends WPBakeryShortCodesContainer {
        }
    }
}

// [quote]
function neat_quote_shortcode($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'class' => '',
        'bg_color' => ''
    ), $params));

    $content = do_shortcode($content);

    $quote_output = '
    <!-- quote container -->
    <div class="quote">
    
        <div class="quote__form--select active'. esc_attr($class).'">
            '.$content.'
        </div>
        <!-- end quote form select -->
        
        <div class="quote__form--input hidden">
            <!-- place quote form inside here -->
        </div>
        <!-- end quote form input -->
        
    </div>
    <!-- end quote container -->
	';

    return $quote_output;
}
add_shortcode('quote', 'neat_quote_shortcode');

// [quote_item]
add_shortcode( 'quote_item', 'neat_quote_item_func' );
function neat_quote_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'answer_color' => '',
        'answer' => '',
        'question_color' => '',
        'question' => '',
        'icon_color' => ''

    ), $atts ) );

    // Bullet Content
    $content = do_shortcode($content);

    // Build Output
    $output = '
        <!-- quote item select -->
        <div class="quote__item">
            item
            <ul class="quote__list">
                '.$content.'
            </ul>
        </div>
        
        <!-- quote item form temp -->
        <div class="quote__form--item temp">
        </div>
    ';

    return $output;
}

// [quote_bullet]
add_shortcode( 'quote_bullet', 'neat_quote_bullet_func' );
function neat_quote_bullet_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'answer_color' => '',
        'answer' => '',
        'question_color' => '',
        'question' => '',
        'icon_color' => ''

    ), $atts ) );

    // Build Output
    $output = '
        <li>
            bullet item
        </li>
    ';

    return $output;
}