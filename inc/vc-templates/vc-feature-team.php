<?php

function getAllMembers(){
    // return assoc array with Name and post ID
    global $post;

    $listings = new WP_Query();

    $names = array();
    $string_names = '';
    $listings->query('post_type=team');

    while ( $listings->have_posts() ) {
        $listings->the_post();

        $name = get_field("full_name");

        if($name){
            $afc_title = get_field("full_name");
            $names[$afc_title] = $post->ID;
        }
    }

    $string_names = join(', ', $names );

    $mypost = $post;

    wp_reset_postdata();
    return $names;
}

// [team]
add_shortcode( 'team', 'team_func' );
function team_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'selected_members' => '',
        'class' => '',
        'header' => '',
        'header_color' => '',
        'subtext' => '',
        'subtext_color' => '',
        'member_text_color' => '',
        'member_header_color' => '',
        'bg_color' => '',
        'padding_top' => '',
        'padding_bottom' => '',
        'layout' => "1",

    ), $atts ) );

    // Default Color
    if($bg_color === ''){
        $bg_color = 'rgba(34, 34, 40, 0.8)';
    }

    //Default Layout
    if($layout === "2"){
        $layout_style = "container-fluid";
    }else{
        $layout_style = "container";
    }

    // Selected members convert to array
    $string_names = explode(',', $selected_members, 20);

    // Query Args
    $args = array(
        'post_type' => 'team',
        'post__in' => $string_names,
    );

    //Inner content
    $content = do_shortcode($content);

    //pass args to new WP_Query
    $the_query = new WP_Query( $args );
    
    // Build Output
    $output = '
    <div class="team-container" 
        style="
            background-color:'. esc_attr($bg_color) .'; 
            padding-bottom:'. esc_attr($padding_bottom) .'; 
            padding-top:'. esc_attr($padding_top) .';">
        
        '.$content.'
        
        <div class="'. esc_attr($layout_style) .'">
            <div class="row">
    ';


    if($the_query->have_posts()){
        while ( $the_query->have_posts() ) {
            $the_query->the_post();

            // Define vars
            $afc_name = get_field("full_name");
            $acf_image = get_field('profile_image');
            $acf_title = get_field('job_title');
            $acf_bio = get_field('bio');
            $image_src = $acf_image['sizes']['neat-square'];
//            $calc = wp_calculate_image_srcset(array('1024', '1024'), $image_src, wp_get_attachment_metadata( $acf_image['id']), $acf_image['id']);
            $img_srcset = wp_get_attachment_image_srcset( $acf_image['id'], 'neat-square' );

            $output .= '
                <div class="col-xs-12 col-md-6 team-wrapper">
                    <div class="col-xs-12 col-sm-4 col-md-5">
                        <div class="team-image">
                            <img 
                            src="'. esc_url($image_src) .'"
                            srcset="'. esc_attr($img_srcset) .'"
                            sizes="(max-width: 400px) 100vw, 400px"
                            alt="'.esc_attr($acf_image['alt']).'">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7">
                        <div class="team-content">
                            <h4 style="color:'.esc_attr($member_header_color).'">'. wp_kses($afc_name, 'neat') .'</h4>
                            <p class="team-title" style="color:'.esc_attr($member_text_color).'">'. wp_kses($acf_title, 'neat') .'</p>
                            <p class="team-bio" style="color:'.esc_attr($member_text_color).'">'. wp_kses($acf_bio, 'neat') .'</p>
                        </div>
                    </div>
                </div>
            ';
        }
    }
    
    $output .= '
            </div>
            <!-- end team row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end team container -->
    ';

    wp_reset_postdata();

    return $output;
}

add_action( 'vc_before_init', 'team_vc_func' );
function team_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Team Members", "neat" ),
        "base"      => "team",
        'icon'        => 'team_icon',
        "as_parent" => array('only' => 'vc_custom_heading, vc_row'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'List of team members.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(
            array(
                'param_name'  => 'selected_members',
                'heading'     => esc_html__( 'Team', 'neat' ),
                'description' => esc_html__( 'Select Members to display', 'neat' ),
                'type'        => 'checkbox',
                "value"			=> getAllMembers()
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Member name text color", "neat" ),
                "param_name" => "member_header_color",
                "value" => '#FFF', //Default White
                "description" => esc_html__( "Choose header text color", "neat" )
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Member text color", "neat" ),
                "param_name" => "member_text_color",
                "value" => '#95989A', //Default P color
                "description" => esc_html__( "Choose text color", "neat" )
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__( "Background color", "neat" ),
                "param_name" => "bg_color",
                "value" => 'rgba(34, 34, 40, 0.8)', //Default P color
                "description" => esc_html__( "Choose background color", "neat" )
            ),
            array(
                'param_name'  => 'layout',
                'heading'     => esc_html__( 'Block or Fluid Layout?', 'neat' ),
                'description' => esc_html__( 'Select layout Type', 'neat' ),
                'type'        => 'dropdown',
                "value"			=> array(
                    "Block Layout" => 1,
                    "Fluid Layout" => 2
                )
            ),
            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Padding Top", "neat" ),
                "param_name" => "padding_top",
                "value" => '',
                "description" => esc_html__( "Add padding top to container in PX.", "neat" )
            ),
            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Padding Bottom", "neat" ),
                "param_name" => "padding_bottom",
                "value" => '',
                "description" => esc_html__( "Add padding bottom to container in PX.", "neat" )
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
        class WPBakeryShortCode_Team extends WPBakeryShortCodesContainer {
        }
    }
};
