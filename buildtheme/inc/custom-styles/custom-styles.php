<?php
if ( !function_exists ('neat_custom_styles') ) {

function neat_custom_styles() {

    global $post, $neat_theme_options;

    //convert hex to rgb
    function neat_hex2rgb($hex) {
        $hex = str_replace("#", "", $hex);

        if(strlen($hex) == 3) {
            $r = hexdec(substr($hex,0,1).substr($hex,0,1));
            $g = hexdec(substr($hex,1,1).substr($hex,1,1));
            $b = hexdec(substr($hex,2,1).substr($hex,2,1));
        } else {
            $r = hexdec(substr($hex,0,2));
            $g = hexdec(substr($hex,2,2));
            $b = hexdec(substr($hex,4,2));
        }
        $rgb = array($r, $g, $b);
        return implode(",", $rgb); // returns the rgb values separated by commas
        //return $rgb; // returns an array with the rgb values
    }
    ob_start();
?>
<!-- ******************************************************************** -->
<!-- * Theme Options Styles ********************************************* -->
<!-- ******************************************************************** -->
<style>

    /***************************************************************/
    /* Body ********************************************************/
    /***************************************************************/

    .content{
    <?php if ( (isset($neat_theme_options['main_background']['background-color'])) ) : ?>
        background-color:<?php echo esc_html($neat_theme_options['main_background']['background-color']); ?>;
    <?php endif; ?>
    <?php if ( (isset($neat_theme_options['main_background']['background-image']) ) && ($neat_theme_options['main_background']['background-image'] != "") ) : ?>
        background-image:url(<?php echo esc_url($neat_theme_options['main_background']['background-image']); ?>);
    <?php endif; ?>
    <?php if ( (isset($neat_theme_options['main_background']['background-repeat'])) && ($neat_theme_options['main_background']['background-repeat'] != "") ) : ?>
        background-repeat:<?php echo esc_html($neat_theme_options['main_background']['background-repeat']); ?>;
    <?php endif; ?>
    <?php if ( (isset($neat_theme_options['main_background']['background-position'])) && ($neat_theme_options['main_background']['background-position'] != "") ) : ?>
        background-position:<?php echo esc_html($neat_theme_options['main_background']['background-position']); ?>;
    <?php endif; ?>
    <?php if ( (isset($neat_theme_options['main_background']['background-size'])) && ($neat_theme_options['main_background']['background-size'] != "") ) : ?>
        background-size:<?php echo esc_html($neat_theme_options['main_background']['background-size']); ?>;
    <?php endif; ?>
    <?php if ( (isset($neat_theme_options['main_background']['background-attachment'])) && ($neat_theme_options['main_background']['background-attachment'] != "") ) : ?>
        background-attachment:<?php echo esc_html($neat_theme_options['main_background']['background-attachment']); ?>;
    <?php endif; ?>
    }

    /***************************************************************/
    /* Fonts *******************************************************/
    /***************************************************************/

    <?php //MAIN FONT FACE ?>

    h1, h2, h3, h4, h5, h6,
    .comments-title,
    .comment-author,
    #reply-title,
    footer .widget-title,
    .accordion_title,
    .button,
    .site-title a,
    .post_meta_archive a,
    .post_meta a,
    .post_tags a,
    .main-navigation > ul > li > a,
    .main-navigation .mega-menu > ul > li > a,
    .more-link,
    .page-numbers,
    .button,
    button,
    .button_text,
    input[type="button"],
    input[type="reset"],
    input[type="submit"],
    .tabs > li > a,
    label,
    .comment-respond label,
    .post-edit-link,
    .vc_pie_chart_value,
    .page-numbers,
    .page-links,
    .widget h3,
    .widget ul a,
    .widget a,
    .comment-reply-link,
    .comment-edit-link,
    .widget-calendar table thead tr th,
    .page-type,
    table thead tr th,
    .vc_btn,
    .vc_btn2,
    .vc_btn3
    {
        font-family:
        <?php if ($neat_theme_options['font_source'] == "3") echo '\'' . $neat_theme_options['main_typekit_font_face'] . '\','; ?>
        <?php if ($neat_theme_options['font_source'] == "2") echo '\'' . $neat_theme_options['main_google_font_face'] . '\','; ?>
        <?php if ($neat_theme_options['font_source'] == "1") echo '\'' . $neat_theme_options['main_font']['font-family'] . '\','; ?>
            sans-serif;
    }
    <?php //endif; ?>

    <?php //SECONDARY FONT FACE ?>
    body,
    p,
    blockquote cite,
    table thead th,
    .post_meta_archive,
    .post_meta,
    .page-links-title,
    .widget_calendar table tbody a,
    .wp-caption .wp-caption-text,
    .wp-caption-text
    {
        font-family:
        <?php if ($neat_theme_options['font_source'] == "3") echo '\'' . $neat_theme_options['secondary_typekit_font_face'] . '\','; ?>
        <?php if ($neat_theme_options['font_source'] == "2") echo '\'' . $neat_theme_options['secondary_google_font_face'] . '\','; ?>
        <?php if ($neat_theme_options['font_source'] == "1") echo '\'' . $neat_theme_options['secondary_font']['font-family'] . '\','; ?>
            sans-serif;
    }
    <?php //endif; ?>


    /***************************************************************/
    /* Body Text Colors  *******************************************/
    /***************************************************************/

    <?php
    if (
        (isset($neat_theme_options['body_color'])) &&
        (trim($neat_theme_options['body_color']) != "" )
        ) : ?>
    body,
    table tr th,
    table tr td,
    table thead tr th,
    blockquote p,
    label,
    .post_meta_archive a,
    .post_meta a,
    .nav-next a,
    .nav-previous a,
    .blog-single h6,
    {
        color: <?php echo esc_html($neat_theme_options['body_color']); ?>;
    }

    .post_tags a
    {
        color: rgba(<?php echo neat_hex2rgb($neat_theme_options['body_color']); ?>,0.4);
    }

    input[type="text"],
    input[type="password"],
    input[type="date"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="month"], input[type="week"],
    input[type="email"], input[type="number"],
    input[type="search"], input[type="tel"],
    input[type="time"], input[type="url"],
    textarea,
    select
    {
        border-color: rgba(<?php echo neat_hex2rgb($neat_theme_options['body_color']); ?>,0.1);
    }

    input[type="text"]:focus, input[type="password"]:focus,
    input[type="date"]:focus, input[type="datetime"]:focus,
    input[type="datetime-local"]:focus, input[type="month"]:focus,
    input[type="week"]:focus, input[type="email"]:focus,
    input[type="number"]:focus, input[type="search"]:focus,
    input[type="tel"]:focus, input[type="time"]:focus,
    input[type="url"]:focus, textarea:focus,
    select:focus{
        border-color: rgba(<?php echo neat_hex2rgb($neat_theme_options['body_color']); ?>,0.15);
    }

    table tr td{
        border-top-color: rgba(<?php echo neat_hex2rgb($neat_theme_options['body_color']); ?>,0.15);
    }

    .comments_section
    {
        background-color: rgba(<?php echo neat_hex2rgb($neat_theme_options['body_color']); ?>,0.01) !important;
    }

    .vc_row {
        margin:0 auto;
    }

    .wpb_content_element{
        margin-bottom: 0;
    }

    <?php endif; ?>

    /***************************************************************/
    /* Heading Colors  *******************************************/
    /***************************************************************/

    <?php if (
        (isset($neat_theme_options['headings_color'])) &&
        (trim($neat_theme_options['headings_color']) != "" ) ) :
    ?>
    h1, h2, h3, h4, h5, h6,
    .entry-title-archive a{
        color: <?php echo esc_html($neat_theme_options['headings_color']); ?>;
    }
    <?php endif; ?>

    /***************************************************************/
    /* Main Color  *************************************************/
    /***************************************************************/

    <?php if (
        (isset($neat_theme_options['main_color'])) &&
        (trim($neat_theme_options['main_color']) != "" ) ) :
    ?>
    a,
    .comments-area a,
    .edit-link,
    blockquote:before,
    .no-results-text:before,
    .comment-reply i,
    .comment-edit-link i,
    .comment-edit-link,
    .rounded-btn
    {
        color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }

    a:hover,
    .comments-area a:hover,
    .post_meta_archive a:hover,
    .post_meta a:hover,
    .entry-title-archive a:hover,
    .list-centered a:hover,
    .edit-link:hover{
        color: rgba(<?php echo neat_hex2rgb($neat_theme_options['main_color']); ?>,0.8);
    }

    a:focus,
    .comments-area a:focus,
    .post_meta_archive a:focus,
    .post_meta a:focus,
    .entry-title-archive a:focus,
    .list-centered a:focus,
    .edit-link:focus{
        color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }

    .button,
    input[type="button"],
    input[type="reset"],
    input[type="submit"],
    .green-spacer,
    .filled,
    .rounded-btn:hover,
    .down-arrow::after, .down-arrow::before,
    .hero
    {
        background-color: <?php echo esc_html($neat_theme_options['main_color']) ?>;
    }
    .rounded-btn:focus{
        color:<?php echo esc_html($neat_theme_options['main_color']) ?>;
    }

    .filled{
        color:white;
    }
    .down-arrow::after, .down-arrow::before{
        background: white;
    }

    .button:hover,
    input[type="button"]:hover,
    input[type="reset"]:hover,
    input[type="submit"]:hover{
        background: rgba(<?php echo neat_hex2rgb($neat_theme_options['main_color']); ?>,0.8) !important;
    }

    .post_tags a:hover,
    .widget .tagcloud a:hover,
    .rounded-btn,
    .dhvc-form-flat .dhvc-form-select select:focus,
    .dhvc-form-flat .dhvc-form-input:hover input,
    .dhvc-form-flat .dhvc-form-captcha:hover input,
    .dhvc-form-flat .dhvc-form-file:hover input[type=text],
    .dhvc-form-flat .dhvc-form-select:hover select,
    .dhvc-form-flat .dhvc-form-textarea:hover textarea,
    .dhvc-form-flat .dhvc-form-radio label:hover i,
    .dhvc-form-flat .dhvc-form-checkbox label:hover i,
    .dhvc-form-flat .dhvc-form-input input:focus,
    .dhvc-form-flat .dhvc-form-captcha input:focus,
    .dhvc-form-flat .dhvc-form-file:hover input[type=text]:focus,
    .dhvc-form-flat .dhvc-form-select select:focus,
    .dhvc-form-flat .dhvc-form-textarea textarea:focus,
    .dhvc-form-flat .dhvc-form-radio input:checked + i
    {
        border-color: <?php echo esc_attr($neat_theme_options['main_color']) ?>;
    }

    .dhvc-form-flat .dhvc-form-checkbox input:checked + i
    {
        border-color: <?php echo esc_attr($neat_theme_options['main_color'])?> !important;
    }

    /* Override for dhvc-plugin *****/
    .dhvc-form-hidden{
        display: block !important;
    }

    .rounded-btn:hover{
        color: #fff;
    }

    /* Override breadcrumbs function output *****/
    .breadcrumb-trail .item-current span {
        color: <?php echo esc_html($neat_theme_options['main_color']); ?> !important;
    }

    /* Override breadcrumbs function output *****/
    .white-btn{
        color: #fff;
        border-color: #fff;
    }
    .white-btn:hover{
        color: #222228;
        border-color: #fff;
        background-color: #fff;
    }

    @media only screen and (min-width: 62em) {
        #header .neat-dropdown-content > li:not(.service-dropdown) > a:hover{
            color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
        }
        #header .neat-dropdown-content > li:not(.service-dropdown) > a:hover::after,
        #header .neat-dropdown-content > li:not(.service-dropdown) > a:hover::before,
        #header .neat-dropdown-content ul a{
            background: <?php echo esc_html($neat_theme_options['main_color']); ?>;
        }

        #header .neat-dropdown-content ul a:hover{
            background: <?php echo esc_attr($neat_theme_options['nav_hover_color']); ?>;
        }
    }

    <?php endif; ?>

    /***************************************************************/
    /* 	Header/Navigation *****************************************************/
    /***************************************************************/

    <?php if ( (isset($neat_theme_options['main_header_background_color'])) ) : ?>

    #header{
        background-color:<?php echo esc_attr($neat_theme_options['main_header_background_color']); ?>;
    }
    <?php endif; ?>

    /***************************************************************/
    /* 	Header Logo *****************************************************/
    /***************************************************************/

    <?php if ( (isset($neat_theme_options['spacing_above_logo'])) ) :
                $spacing_above_logo = $neat_theme_options['spacing_above_logo'];
            else:
                $spacing_above_logo = 10;
            endif;
    ?>

    <?php if ( (isset($neat_theme_options['spacing_below_logo'])) ) :
                $spacing_below_logo = $neat_theme_options['spacing_below_logo'];
            else:
                $spacing_below_logo = 10;
            endif;
    ?>

    <?php if ( (isset($neat_theme_options['logo_height'])) ) :

            $logo_height = $neat_theme_options['logo_height'] + 15;
            $logo_height__laptop = $neat_theme_options['logo_height']; ?>

            .navbar-dropdown,
            .neat-dropdown-wrapper {
                height: <?php echo esc_attr($logo_height)?>px;
            }
            .neat-dropdown-content {
                padding-top: <?php echo esc_attr($logo_height)?>px;
            }
            #header .navbar-brand > img{
                max-height: <?php echo esc_attr($logo_height)?>px;
            }
    <?php
            else:
                $logo_height = 85;?>

            .navbar-dropdown,
            .neat-dropdown-wrapper {
                height: <?php echo esc_attr($logo_height)?>px;
            }

            .neat-dropdown-content {
                padding-top: <?php echo esc_attr($logo_height)?>px;
            }

    <?php endif; ?>

    <?php if ( (isset($neat_theme_options['spacing_left_logo'])) ) :
                $spacing_left_logo = $neat_theme_options['spacing_left_logo'];
            else:
                $spacing_left_logo = 15;
            endif;
    ?>

    <?php if ( (isset($neat_theme_options['main_header_font_color'])) ) :
            $navFontColor = $neat_theme_options['main_header_font_color'];
        else:
            $navFontColor = "#000";
        endif;
    ?>

    /* logo */
    #header .navbar-brand{
        padding-top: <?php echo esc_attr($spacing_above_logo)?>px;
        padding-bottom: <?php echo esc_attr($spacing_below_logo)?>px;
        padding-left: <?php echo esc_attr($spacing_left_logo)?>px
    }

    <?php
        // Conversions
        $upperContainerHeight = $spacing_below_logo + $logo_height;
        $headerHeight = $upperContainerHeight + $spacing_below_logo;

        //tablet nav height
        $tablet_height = $upperContainerHeight - $spacing_below_logo + $spacing_above_logo + 15;

        //desktop absolute nav position top
        $nav_height = 70;
        $desktop_top_offset = $headerHeight - ($nav_height/2);

        //li padding calc
        $li_text_height = 24;
        $li_padding = ($logo_height - $li_text_height) / 2;

        // li caret calc
        $li_caret_top = $logo_height / 2;

    ?>

    @media only screen and (min-width: 992px) {

        .nav-main__container {
            height: <?php echo esc_attr($logo_height)?>px;
        }

        <?php if ( (isset($neat_theme_options['main_header_font_size'])) ) :
        
            $fontSize = $neat_theme_options['main_header_font_size'];

            else:

            $fontSize = 13;

        endif; ?>

        <?php
            //convert rem function
            $rem = str_split($fontSize);
            $remDec = array();
            foreach($rem as $value){
                $count = 0;

                if($count === 0){
                    array_push($remDec, $value);
                }

                if( $count === 1) {
                    array_push($remDec, $value);
                }

                $count++;
            }
            $implodeRem = implode(".", $remDec);
        ?>

        .neat-dropdown-content a{
            text-transform: uppercase;
            font-weight: 600;
            color: rgba(<?php echo neat_hex2rgb($navFontColor); ?>,1);
        }
        .neat-dropdown-content .menu-item-has-children > a,
        .neat-dropdown-content ul .menu-item-has-children > a {
            padding-top: <?php echo esc_attr($li_padding)?>px;
            padding-bottom: <?php echo esc_attr($li_padding)?>px;
        }
        .neat-dropdown-content .menu-item-has-children > a::after,
        .neat-dropdown-content .menu-item-has-children > a::before,
        .neat-dropdown-content ul .menu-item-has-children > a::after,
        .neat-dropdown-content ul .menu-item-has-children > a::before {
            top: <?php echo esc_attr($li_caret_top)?>px;
        }

        .neat-dropdown-content .menu-item-has-children > a::after,
        .neat-dropdown-content .menu-item-has-children > a::before{
            background: rgba(<?php echo neat_hex2rgb($navFontColor); ?>,1);
        }

        #header .neat-dropdown-content ul a{
            background: <?php echo esc_attr($neat_theme_options['nav_item_color']);?>;
        }
        #header .neat-dropdown-content ul a:hover {
            background: <?php echo esc_attr($neat_theme_options['nav_hover_color']);?>;
        }
    }

    @media only screen and (min-width: 1200px) {

        #header .navbar-brand{
            height: <?php echo esc_attr($logo_height)?>px;
        }


    }

    /***************************************************************/
    /* 	Widgets *****************************************************/
    /***************************************************************/
    .widget,
    footer .widget h6,
    footer .hours-widget h6:before
    {
        color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }
    .input-mail .icon {
        background: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }
    .tagcloud a{
        border-color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }

    .tagcloud a:hover {
        background-color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }

    /***************************************************************/
    /* 	Footer *****************************************************/
    /***************************************************************/

    <?php if (
        (isset($neat_theme_options['footer_texts_color'])) &&
        (trim($neat_theme_options['footer_texts_color']) != "" ) ) :
    ?>
    footer h1,
    footer h2,
    footer h3,
    footer h4,
    footer h5,
    footer h6,
    footer p
    {
        color: <?php echo esc_html($neat_theme_options['footer_texts_color']); ?>;
    }
    <?php endif; ?>

    <?php if (
        (isset($neat_theme_options['footer_background_color'])) &&
        (trim($neat_theme_options['footer_background_color']) != "" ) ) :
    ?>
    footer
    {
        background-color: <?php echo esc_html($neat_theme_options['footer_background_color']); ?>;
    }
    <?php endif; ?>

    <?php if (
        (isset($neat_theme_options['footer_links_color'])) &&
        (trim($neat_theme_options['footer_links_color']) != "" ) ) :
    ?>
    footer a
    {
        color: <?php echo esc_html($neat_theme_options['footer_links_color']); ?>;
    }

    .footer-bottom{
        border-color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }
    .copyright a{
        color: <?php echo esc_html($neat_theme_options['main_color']); ?>;
    }
    <?php endif; ?>

    <?php if ( (isset($neat_theme_options['custom_css'])) && (trim($neat_theme_options['custom_css']) != "" ) ) : ?>
/********************************************************************/
    /* Custom CSS *******************************************************/
    /********************************************************************/
        <?php echo esc_attr($neat_theme_options['custom_css']) ?>
    <?php endif; ?>

</style>
<?php
//$content = ob_get_clean();
//$content = str_replace(array("\r\n", "\r"), "\n", $content);
//$lines = explode("\n", $content);
//$new_lines = array();
//foreach ($lines as $i => $line) { if(!empty($line)) $new_lines[] = trim($line); }
//echo implode($new_lines);

} //neat_custom_styles
} //if
?><?php add_action( 'wp_head', 'neat_custom_styles', 99 ); ?>
