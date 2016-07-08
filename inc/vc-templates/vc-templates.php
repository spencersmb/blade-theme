<?php
/**
* VC Templates.
*/
require get_template_directory() . '/inc/vc-templates/vc-banner.php';
require get_template_directory() . '/inc/vc-templates/vc-example.php';
require get_template_directory() . '/inc/vc-templates/vc-nested-example.php';


require get_template_directory() . '/inc/vc-templates/vc-hero-header.php';
require get_template_directory() . '/inc/vc-templates/vc-service-sidebar.php';
require get_template_directory() . '/inc/vc-templates/vc-dual-images.php';
require get_template_directory() . '/inc/vc-templates/vc-icons.php';
require get_template_directory() . '/inc/vc-templates/vc-process.php';
require get_template_directory() . '/inc/vc-templates/vc-desc-image-offset.php';
require get_template_directory() . '/inc/vc-templates/vc-faq.php';
require get_template_directory() . '/inc/vc-templates/vc-slider-header.php';
require get_template_directory() . '/inc/vc-templates/vc-blog-feature.php';
require get_template_directory() . '/inc/vc-templates/vc-showcase-slider.php';
require get_template_directory() . '/inc/vc-templates/vc-testimonials.php';
require get_template_directory() . '/inc/vc-templates/vc-custom-quote.php';
require get_template_directory() . '/inc/vc-templates/vc-removed.php';

if(function_exists('get_field')){
    require get_template_directory() . '/inc/vc-templates/vc-feature-team.php';
}