<?php
/*
  Template Name: Gallery Index
*/

$post_classes = array(
    'col-xs-12',
    'col-sm-6',
    'col-md-4',
    'post-thumb',
);

//filter 
$has_filter = get_field('show_filter');
$gallery_type = get_field('gallery_type');
$filter_terms = get_terms( 'gallery_filter', array('fields' => 'names') );

$page_layout = get_redux_options('gallery_layout');
$page_layout_css = '';

if($page_layout === "1"){
    $page_layout_css = 'full-width-gallery';
} else {
    $page_layout_css = 'width-contained';
}

get_header();
?>
    <main class="container-fluid no-padding">

    <?php while ( have_posts() ) : the_post(); ?>

        <?php the_content(); ?>

    <?php endwhile; // end of the loop. ?>


        <?php if($has_filter): ?>
            <!--
            #################################
                       - Filter -
            #################################
            -->
            <section class="gallery-filter-container m-page scene_element scene_element--fadeinup">
                
            <!-- gallery filter -->
            <?php if(!is_wp_error( $filter_terms )): ?>
                <div class="col-xs-12 gallery-filters">
                    <ul class="filter-group">

                            <li class="filter-item" data-filter="*">Show All<span></span></li>
                        
                            <?php foreach($filter_terms as $filter): ?>

                            <li class="filter-item"
                                data-filter=".<?php echo strtolower(esc_attr($filter)); ?>">
                                <?php echo wp_kses($filter, 'neat') ?><span></span></li>

                        <?php endforeach; ?>
                    </ul>
                </div>
                <!-- end filter -->

            <?php endif; ?>
            </section>

        <?php endif; ?>

    <!--
    #################################
               - Gallery -
    #################################
    -->
    <?php if($page_layout === "1"): ?>
        <section class="gallery-container container-fluid no-padding m-page scene_element scene_element--fadein">
    <?php else: ?>
        <section class="gallery-container container no-padding m-page scene_element scene_element--fadein">
    <?php endif; ?>

            <div class="inner-content-module full-width-container">
                <?php
                $gallery_id='';
                switch ($gallery_type) {

                    case 'masonry':

                        echo'
                        <div id="masonry-gallery" class="col-xs-12 width-contained no-padding gallery-isotope">
                        ';

                        break;

                    case '3col':
                        echo'
                        <div id="gallery-3" class="col-xs-12 gallery-3-grid no-padding gallery-isotope">
                        ';
                        break;

                    case '4col':
                        echo'
                        <div id="gallery-4" class="col-xs-12 gallery-4-grid no-padding gallery-isotope">
                        ';
                        break;

                    case '5col':
                        echo'
                        <div id="gallery-5" class="col-xs-12 gallery-5-grid no-padding gallery-isotope">
                        ';
                        break;
                }

                ?>

                <div class="grid-sizer"></div>
                <?php
                /////////////////////
                //Build loop
                /////////////////////
                $args = array(
                    'posts_per_page'  => -1,
                    'post_type' => 'gallery',
                    'orderby'=> 'menu_order',
                    'order'=>'ASC'
                );

                //pass args to new WP_Query
                $the_query = new WP_Query( $args );

                if( have_posts()): while( $the_query->have_posts() ): $the_query->the_post();

                    // Set Image object
                    $image = get_field('gallery_square_image');
                    $image_wide_preview = get_field('gallery_wide_image');

                    // Set image sizes
                    $image_small = $image['sizes']['neat-square'];
                    $image_wide = $image_wide_preview['url'];
                    $image_large = $image['url'];

                    // Is image square or wide
                    $masonry_size = get_field('gallery_thumbnail_size');


                    //get taxonomy filter names
                    $filter_tax = wp_get_post_terms( $post->ID, 'gallery_filter' );
                    $filter_arr = array();
                    $css_filter_names = '';

                    foreach($filter_tax as $filter){
                        $filter_arr[] = $filter->slug;
                    }

                    $css_filter_names = join(' ', $filter_arr ) ;

                    //Get tags
                    $tags = neat_get_postTags_string($post->ID);

                    //Add css names for gallery sizing
                    switch ($gallery_type) {

                        case 'masonry':
                            $item_size_css ='';

                            //image size css name
                            switch ($masonry_size) {

                                case 'wide':
                                    $item_size_css = 'width2';
                                    break;

                                case 'large':
                                    $item_size_css = 'height2 width2';
                                    break;

                                default:
                                    $item_size_css = 'width1';

                            }

                            echo'
                                <div class="gallery-item '. esc_attr($item_size_css) . ' ' . esc_attr($css_filter_names) .'">
                                ';

                            break;

                        default:

                            echo'
                                <div class="gallery-item width1 ' . esc_attr($css_filter_names) .'">
                                ';

                    }

                    echo'
                        <a href="'. get_permalink() .'">
                            <h5>'. get_the_title() .'</h5>
                            <div class="subtext">'. esc_attr($tags) .'</div>
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            <div class="overlay2"></div>
                            <div class="overlay"></div>';

                    //display img or background image
                    switch ($gallery_type) {

                        case 'masonry':

                            switch( $masonry_size ){

                                case 'wide':
                                    echo '<span style="background-image: url('. esc_url($image_wide) .');"></span>';
                                    break;

                                case 'large':
                                    echo '<span style="background-image: url('. esc_url($image_large) .');"></span>';
                                    break;

                                default:
                                    echo '<span style="background-image: url('. esc_url($image_small) .');"></span>';
                            }

                            break;

                        default:
                            $image_alt = $image['alt'];

                            //Safety check for wide images in case the user has not set all images to square
                            switch ($masonry_size) {

                                case 'wide':
                                    $img_wide_preview = $image_wide_preview['sizes']['neat-square'];
                                    echo'
                                <img
                                    class="img-responsive"
                                    src="'. esc_url($img_wide_preview) .'"
                                    alt="'. wp_kses($image_alt, 'neat') .'" />
                                ';

                                    break;

                                default:
                                    echo'
                                    <img class="img-responsive" src="'. esc_url($image_small) .'" alt="'. wp_kses($image_alt, 'neat') .'" />
                                    ';

                            }

                    }
                    echo '
                        </a>
                    </div>
                    ';

                endwhile; endif;

                ?>

            </div>
            <!-- end isotope inner wrapper -->

        </section>
        <!-- end gallery section -->
    </main>
<?php get_footer(); ?>
