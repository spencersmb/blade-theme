<?php
add_action( 'vc_before_init', 'neat_faq' );
function neat_faq()
{

    vc_map(array(
        "name" => esc_html__("Faq List", "neat"),
        "category" => esc_html__("Content", "neat"),
        "description" => esc_html__("Add Freaquently Asked Question item", "neat"),
        "as_parent" => array('only' => 'faq_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        "base" => "faq",
        "class" => "",
        "icon" => "faq_icon",

        "params" => array(

            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Background Color", "neat"),
                "value" => '#fff', //Default White
                "class" => "hide_in_vc_editor",
                "param_name" => "bg_color",
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Extra class name', 'neat' ),
                'param_name' => 'el_class',
                'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'neat' ),
            )

        )

    ));
    vc_map( array(
        "name"      => esc_html__( "FAQ Item", "neat" ),
        "base"      => "faq_item",
        'icon'        => 'faq_item_icon',
        "as_child" => array('only' => 'faq'),
        'description' => esc_html__( 'Add an item to the FAQ list.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(

            array(
                'type' => 'textfield',
                'heading' => esc_html__( 'Question Text', 'neat' ),
                'param_name' => 'question',
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                'description' => esc_html__( 'Type in your question.', 'neat' ),
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__("Question Text Color", "neat"),
                "class" => "hide_in_vc_editor",
                "value" => '#222228',
                "param_name" => "question_color",
            ),
            array(
                'type' => 'textarea',
                'heading' => esc_html__( 'Answer Text', 'neat' ),
                "class" => "hide_in_vc_editor",
                'param_name' => 'answer',
                'description' => esc_html__( 'Type in the answer to your question.', 'neat' ),
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Answer Text Color", "neat"),
                "value" => '#222228',
                "param_name" => "answer_color",
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__("Icon Color", "neat"),
                "value" => '#7ED321',
                "param_name" => "icon_color",
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
        class WPBakeryShortCode_Faq extends WPBakeryShortCodesContainer {
        }
    }
}

// [faq]
function faq_shortcode($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'el_class' => '',
        'bg_color' => ''
    ), $params));

    $content = do_shortcode($content);

    $faq_output = '
    <!-- faq container -->
   <div class="faq-items '. esc_attr($el_class).'">
        <ul id="faq" class="faq-group">
        '.$content.'
        </ul>
    </div>
    <!-- end faq container -->
	';
    $js =
    '<script>
    (function($) {
        "use strict";
        var faqTrigger = $(".faq-trigger");
    
        faqTrigger.on("click", function(event){
          event.preventDefault();
          $(this).next(".faq-content").slideToggle(200).end().parent("li").toggleClass("active");
        });
      })(jQuery);
    </script>';

    $faq_output .= html_entity_decode($js);

    return $faq_output;
}
add_shortcode('faq', 'faq_shortcode');

// [faq_item]
add_shortcode( 'faq_item', 'faq_item_func' );
function faq_item_func( $atts, $content = null ) { // New function parameter $content is added!
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
        <li class="card-shadow-lt '. esc_attr($class) .'">
            <a class="faq-trigger" href="#" style="color:'. esc_attr($question_color) .'">'. wp_kses($question, 'neat').'</a>
            <div class="faq-content">
                <div class="faq-wrapper">
                    <p style="color:'. esc_attr($answer_color) .'">'. wp_kses($answer, 'neat').'</p>
                </div>
            </div>
        </li>
    ';

    return $output;
}



