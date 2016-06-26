<?php
add_action( 'vc_before_init', 'neat_dual_images' );

function neat_dual_images()
{

    vc_map(array(
        "name" => esc_html__("Dual Images", "neat"),
        "category" => esc_html__("Content", "neat"),
        "description" => esc_html__("Place Two Overlapping Images", "neat"),
        "base" => "dual_images",
        "class" => "et-dual-image",
        "icon" => "dual_images",

        "params" => array(

            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Image One",
                "param_name" => "image_1",
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => true,
                "heading" => "Image Two",
                "param_name" => "image_2",
            )
        )

    ));
}

// [dual_images]
function dual_images_shortcode($params = array(), $content = null) {
    extract(shortcode_atts(array(
        'image_1' => '',
        'image_2' => ''
    ), $params));

    if (is_numeric($image_1)) {
        $image_1 = wp_get_attachment_url($image_1);
    }
    if (is_numeric($image_2)) {
        $image_2 = wp_get_attachment_url($image_2);
    }

    $dual_images_output = '
    <!-- dual images -->
    <div class="dual-images-container">
        <div class="image-1">
            <img class="img-responsive" src="'.esc_url($image_1).'" alt="temp">
        </div>
        <div class="image-2">
            <img class="img-responsive" src="'.esc_url($image_2).'" alt="temp">
        </div>
    </div>
    <!-- end dual images -->
	';

    return $dual_images_output;
}

add_shortcode('dual_images', 'dual_images_shortcode');

